import { StyleSheet, View, Button, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Input } from '../components/ui/Input'
import { FormItem } from '../components/ui/FormItem'
import { COLORS } from '../constants/GlobalStyles'
import { getToken } from '../util/auth'

export const LoginScreen = () => {
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
      // Get token, store it
      console.log(response.data.access_token)
    } else {
      Alert.alert('Invalid credentials', 'Email or password incorrect')
    }
    // cleanup
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
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
              <Button onPress={handleSubmit} title='Save' />
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
})
