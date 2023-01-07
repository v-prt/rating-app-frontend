import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { dummyRatings } from '../data/dummy-data'
import { RatingListItem } from '../components/RatingListItem'

export const RatingsList = ({ route, navigation }) => {
  const category = route.params.category
  const ratings = dummyRatings.filter(rating => rating.category === category)

  useEffect(() => {
    navigation.setOptions({
      title: category,
    })
  }, [category, navigation])

  const selectRatingHandler = ratingId => {
    navigation.navigate('RatingDetails', { ratingId })
  }

  return (
    <View style={styles.screen}>
      {ratings?.length > 0 ? (
        <FlatList
          data={ratings}
          renderItem={({ item }) => (
            <RatingListItem item={item} onPress={() => selectRatingHandler(item.id)} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>No ratings in this category yet.</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#fff',
    opacity: 0.5,
  },
})
