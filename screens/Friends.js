import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../constants/GlobalStyles'

export const Friends = () => {
  return (
    <View style={styles.screen}>
      <Text>TODO: Friends Screen (need to scope)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.primary800,
    flex: 1,
    padding: 20,
  },
})
