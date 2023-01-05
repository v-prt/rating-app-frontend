import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'

export const RecentRatingsList = () => {
  return (
    <View style={styles.screen}>
      <Text>Recent Ratings Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
  },
})
