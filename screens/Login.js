import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Input } from '../components/ui/Input'
import { FormItem } from '../components/ui/FormItem'
import { COLORS } from '../constants/GlobalStyles'
import { getToken } from '../util/auth'
import { ActionButton } from '../components/ui/ActionButton'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const Login = ({ navigation }) => {
  const userCtx = useContext(UserContext)

  const validationSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email address.').required('Required'),
    password: yup.string().required('Required').min(6, 'Passwords must be at least 6 characters'),
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
  }

  const signUpHandler = () => {
    navigation.navigate('SignUp')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            validateOnBlur={false}
            onSubmit={loginHandler}>
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
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
                  <ActionButton onPress={handleSubmit} loading={isSubmitting}>
                    Log In
                  </ActionButton>
                  <ActionButton
                    onPress={signUpHandler}
                    buttonStyle={styles.flatButton}
                    textStyle={styles.flatButtonText}>
                    Sign Up Instead
                  </ActionButton>
                </View>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
    padding: 20,
  },
  buttons: {
    marginVertical: 16,
  },
  flatButton: {
    backgroundColor: 'transparent',
  },
  flatButtonText: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
  },
  signUpSuccess: {
    marginBottom: 40,
  },
})
