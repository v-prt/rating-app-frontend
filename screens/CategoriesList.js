import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { dummyRatings } from '../data/dummy-data'
import { CategoryListItem } from '../components/CategoryListItem'

export const CategoriesList = ({ navigation }) => {
  const [categories, setCategories] = useState([
    // 'Books', (in user's categories)
    'Movies',
    'TV Shows',
    'Video Games',
    'Board Games',
    'Music',
    'Restaurants',
    'Other',
  ])

  useEffect(() => {
    // get categories from dummy data, remove duplicates
    const userCategories = dummyRatings
      .map(rating => rating.category)
      .filter((category, index, self) => self.indexOf(category) === index)
    setCategories(
      // add user categories to default categories, ignore duplicates
      categories
        .concat(userCategories)
        .filter((category, index, self) => self.indexOf(category) === index)
    )
  }, [dummyRatings])

  const selectCategoryHandler = category => {
    navigation.navigate('RatingsList', { category })
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryListItem category={item} onPress={() => selectCategoryHandler(item)} />
        )}
        keyExtractor={item => item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
  },
})
