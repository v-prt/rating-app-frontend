import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Input } from '../components/ui/Input'
import { FormItem } from '../components/ui/FormItem'
import { ActionButton } from '../components/ui/ActionButton'
import { createUser } from '../util/auth'

export const SignUpScreen = ({ navigation }) => {
  const validationSchema = yup.object().shape({
    email: yup.string().required('Required').email('Invalid email'),
    password: yup.string().required('Required').min(6, 'Passwords must be at least 6 characters'),
    username: yup.string().required('Required').min(4, 'Username must be at least 4 characters'),
    firstName: yup.string(),
    lastName: yup.string(),
  })

  const initialValues = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
  }

  const createAccountHandler = async values => {
    const response = await createUser(values)

    if (response.status === 201) {
      //success stuff
    } else if (response.status === 400) {
      Alert.alert('Invalid credentials', response.data.detail)
    } else {
      // general error stuff
    }
  }

  const returnToLoginHandler = () => {
    navigation.navigate('Login')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}>Create an Account</Text>
        </View>
        <View style={styles.formContainer}>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={createAccountHandler}>
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <>
                <FormItem name='email' label='Email'>
                  <Input
                    config={{
                      onBlur: handleBlur('email'),
                      onChangeText: handleChange('email'),
                      value: values.email,
                      keyboardType: 'email-address',
                      autoCapitalize: 'none',
                    }}
                  />
                </FormItem>
                <FormItem name='password' label='Password'>
                  <Input
                    config={{
                      onBlur: handleBlur('password'),
                      onChangeText: handleChange('password'),
                      value: values.password,
                      secureTextEntry: true,
                    }}
                  />
                </FormItem>
                <FormItem name='username' label='Username'>
                  <Input
                    config={{
                      onBlur: handleBlur('username'),
                      onChangeText: handleChange('username'),
                      value: values.username,
                      autoCorrect: false,
                    }}
                  />
                </FormItem>
                <FormItem name='firstName' label='First name (optional)'>
                  <Input
                    config={{
                      onBlur: handleBlur('firstName'),
                      onChangeText: handleChange('firstName'),
                      value: values.firstName,
                    }}
                  />
                </FormItem>
                <FormItem name='lastName' label='Last name (optional)'>
                  <Input
                    config={{
                      onBlur: handleBlur('lastName'),
                      onChangeText: handleChange('lastName'),
                      value: values.lastName,
                    }}
                  />
                </FormItem>
                <View style={styles.button}>
                  <ActionButton onPress={handleSubmit}>Create Account!</ActionButton>
                </View>
              </>
            )}
          </Formik>
        </View>
        <ActionButton onPress={returnToLoginHandler} style={styles.loginButton}>
          Login instead?
        </ActionButton>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: COLORS.primary100,
    textAlign: 'center',
    fontFamily: 'Karla-Bold',
    marginBottom: 16,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  button: {
    marginTop: 12,
    width: '75%',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: 'transparent',
  },
})
