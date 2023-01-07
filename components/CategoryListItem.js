import { StyleSheet, Pressable, Text } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { dummyRatings } from '../data/dummy-data'

export const CategoryListItem = ({ category, onPress }) => {
  const numRatings = dummyRatings.filter(rating => rating.category === category).length

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.pressed,
        numRatings === 0 && styles.empty,
      ]}
      onPress={onPress}>
      <Text style={styles.title}>{category}</Text>
      <Text style={styles.num}>{numRatings > 0 && numRatings}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.primary600,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: {
    opacity: 0.7,
  },
  empty: {
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    color: COLORS.primary100,
  },
  num: {
    fontSize: 14,
    color: COLORS.primary200,
  },
})
