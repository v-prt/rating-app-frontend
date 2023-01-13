import { useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ActionButton } from '../components/ui/ActionButton'
import { COLORS } from '../constants/GlobalStyles'
import { UserContext } from '../context/UserContext'

export const ProfileScreen = () => {
  const { logout } = useContext(UserContext)

  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
      <ActionButton onPress={logout}>Log Out</ActionButton>
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
