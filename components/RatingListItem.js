import { StyleSheet, Pressable, View, Text } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { Ionicons } from '@expo/vector-icons'

export const RatingListItem = ({ rating, onPress }) => {
  return (
    <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.title}>{rating.title}</Text>
        <View style={styles.ratingWrapper}>
          <Text style={styles.rating}>{rating.rating}</Text>
          <Ionicons name='star' size={12} color={COLORS.primary200} />
        </View>
      </View>
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
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: COLORS.primary100,
    maxWidth: '80%',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 6,
    color: COLORS.primary100,
  },
})
