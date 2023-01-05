import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { dummyRatings } from '../data/dummy-data'
import { CategoryItem } from '../components/CategoryListItem'

export const RatingDetails = ({ route }) => {
  const [ratingData, setRatingData] = useState()

  useEffect(() => {
    // get rating by id from dummy data
    setRatingData(
      dummyRatings.find(rating => (rating.id === route.params.ratingId ? rating : null))
    )
  }, [route, dummyRatings])

  return (
    <ScrollView style={styles.screen}>
      <View>
        <Text>{ratingData?.title}</Text>
        <Text>{ratingData?.rating}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
  },
})
