import { StyleSheet, Pressable, View, Text } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

export const RatingListItem = ({ item, onPress }) => {
  return (
    <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{moment(item.date).format('ll')}</Text>
      </View>
      <View style={styles.ratingWrapper}>
        <Text style={styles.rating}>{item.rating}</Text>
        <Ionicons name='star' size={12} color={COLORS.primary200} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  textWrapper: {
    maxWidth: '80%',
  },
  title: {
    fontSize: 18,
    color: COLORS.primary100,
  },
  date: {
    color: COLORS.primary100,
    opacity: 0.5,
    fontsize: 14,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontFamily: 'Karla-Bold',
    marginRight: 6,
    color: COLORS.primary100,
  },
})
