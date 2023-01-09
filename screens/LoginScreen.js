import { StyleSheet, View, Button } from 'react-native'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Input } from '../components/ui/Input'
import { FormItem } from '../components/ui/FormItem'
import { COLORS } from '../constants/GlobalStyles'

export const LoginScreen = () => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Required').min(6, 'Usernames must be at least 6 characters'),
    password: yup.string().required('Required').min(6, 'Passwords must be at least 6 characters'),
  })

  const initialValues = {
    username: '',
    password: '',
  }

  const loginHandler = () => {}

  return (
    <View style={styles.screen}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={loginHandler}>
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <>
            <FormItem name='username' label='Username'>
              <Input
                config={{
                  onBlur: handleBlur('username'),
                  onChangeText: handleChange('username'),
                  value: values.username,
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
