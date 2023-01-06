import { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export const ManageRating = ({ route, navigation }) => {
  const ratingId = route.params?.ratingId

  useEffect(() => {
    navigation.setOptions({
      title: ratingId ? 'Edit Rating' : 'Add Rating',
    })
  }, [ratingId, navigation])

  return (
    <View style={styles.container}>
      <Text>Manage Rating Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
