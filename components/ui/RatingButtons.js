import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, View, Pressable } from 'react-native'
import { COLORS } from '../../constants/GlobalStyles'
import * as Haptics from 'expo-haptics'

export const RatingButtons = ({ rating, setRating }) => {
  const handleRating = rating => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setRating(rating)
  }

  const starButtons = [...Array(10)].map((_, i) => {
    const name = i < rating ? 'star' : 'star-border'
    const color = i < rating ? COLORS.primary100 : COLORS.primary400

    return (
      <Pressable key={i} onPress={() => handleRating(i + 1)} style={styles.button}>
        <MaterialIcons name={name} size={24} color={color} />
      </Pressable>
    )
  })

  return <View style={styles.container}>{starButtons}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    margin: 2,
  },
})
