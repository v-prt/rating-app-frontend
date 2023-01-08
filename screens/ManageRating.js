import { useEffect } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { Formik } from 'formik'
import * as yup from 'yup'
import { dummyRatings } from '../data/dummy-data'
import { FormItem } from '../components/ui/FormItem'

export const ManageRating = ({ route, navigation }) => {
  const ratingId = route.params?.ratingId
  const existingData = ratingId
    ? dummyRatings.find(rating => rating.id === route.params?.ratingId)
    : null

  useEffect(() => {
    navigation.setOptions({
      title: ratingId ? 'Edit Rating' : 'Add Rating',
    })
  }, [ratingId, navigation])

  const validationSchema = yup.object().shape({
    title: yup.string().required('Required').min(2, 'Too short'),
    // rating: yup.number().required('Required').min(1).max(10).integer(),
    // description: yup.string(),
    // image: yup.string(),
  })

  const initialValues = {
    title: existingData?.title || '',
    rating: existingData?.rating || '',
    description: existingData?.description || '',
    image: existingData?.image || '',
  }

  const saveRatingHandler = values => {
    console.log('saveRatingHandler')
    console.log(values)
  }

  return (
    <View style={styles.screen}>
      {/* TODO: inputs for title, rating (stars), description, image, and map */}
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={saveRatingHandler}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <FormItem name='title' label='Title'>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
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
    padding: 20,
  },
  input: {
    backgroundColor: COLORS.primary100,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
})
