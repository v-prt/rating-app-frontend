import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Alert, Text } from 'react-native'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Input } from '../components/ui/Input'
import { FormItem } from '../components/ui/FormItem'
import { COLORS } from '../constants/GlobalStyles'
import { getToken } from '../util/auth'
import { ActionButton } from '../components/ui/ActionButton'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const LoginScreen = ({ navigation }) => {
  const userCtx = useContext(UserContext)

  const validationSchema = yup.object().shape({
    email: yup.string().required('Required').min(3, 'Usernames must be at least 6 characters'),
    password: yup.string().required('Required').min(3, 'Passwords must be at least 6 characters'),
  })

  const initialValues = {
    email: '',
    password: '',
  }

  const loginHandler = async ({ email, password }) => {
    const response = await getToken(email, password)
    if (response.status === 200) {
      userCtx.authenticate(response.data.access_token)
    } else {
      Alert.alert('Invalid credentials', 'Email or password incorrect')
    }
    // cleanup
  }

  const signUpHandler = () => {
    navigation.navigate('SignUp')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}>Login</Text>
        </View>
        <View>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={loginHandler}>
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <>
                <FormItem name='email' label='Email'>
                  <Input
                    config={{
                      onBlur: handleBlur('email'),
                      onChangeText: handleChange('email'),
                      value: values.email,
                      autoCapitalize: 'none',
                      keyboardType: 'email-address',
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
                <View style={styles.buttons}>
                  <View style={styles.buttonContainer}>
                    <ActionButton onPress={handleSubmit}>Login</ActionButton>
                  </View>
                  <View style={styles.buttonContainer}>
                    <ActionButton onPress={signUpHandler} style={styles.signUp}>
                      Sign Up
                    </ActionButton>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
    justifyContent: 'center',
    padding: 14,
  },
  title: {
    fontSize: 24,
    color: COLORS.primary100,
    textAlign: 'center',
    fontFamily: 'Karla-Bold',
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    padding: 12,
  },
  signUp: {
    backgroundColor: COLORS.primary800,
    borderColor: COLORS.primary200,
    borderWidth: 2,
  },
})
