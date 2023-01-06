import { StyleSheet, Pressable, Text } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'

export const CategoryListItem = ({ category, onPress }) => {
  // TODO: make list item dark/low opacity if no ratings in this category - add number of ratings in category

  return (
    <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.title}>{category}</Text>
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
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 16,
    color: COLORS.primary100,
  },
})
