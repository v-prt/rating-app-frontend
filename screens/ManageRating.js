import { useEffect, useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { Formik } from 'formik'
import * as yup from 'yup'
import { dummyRatings } from '../data/dummy-data'
import { FormItem } from '../components/ui/FormItem'
import { Input } from '../components/ui/Input'
import { RatingButtons } from '../components/ui/RatingButtons'

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
    rating: yup.number().required('Required').min(1, 'Required'),
    description: yup.string(),
    // image: yup.string(),
  })

  const initialValues = {
    title: existingData?.title || '',
    rating: existingData?.rating || 0,
    description: existingData?.description || '',
    // image: existingData?.image || '',
  }

  const saveRatingHandler = values => {
    console.log('saveRatingHandler')
    console.log(values)
  }

  return (
    <View style={styles.screen}>
      {/* TODO:
        - image (choose from device album or take image with device camera)
        - location/address (current location or choose from map)
        - submit to backend */}
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={saveRatingHandler}>
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <>
            <FormItem name='title' label='Title'>
              <Input
                config={{
                  onBlur: handleBlur('title'),
                  onChangeText: handleChange('title'),
                  value: values.title,
                }}
              />
            </FormItem>
            <FormItem name='rating' label='Rating'>
              <RatingButtons
                rating={values.rating}
                setRating={rating => {
                  setFieldValue('rating', rating)
                }}
              />
            </FormItem>
            <FormItem name='description' label='Description'>
              <Input
                config={{
                  onBlur: handleBlur('description'),
                  onChangeText: handleChange('description'),
                  value: values.description,
                  multiline: true,
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
    padding: 20,
  },
})
