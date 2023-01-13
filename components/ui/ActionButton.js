import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/GlobalStyles'

export const ActionButton = ({ children, onPress, buttonStyle, textStyle }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={[styles.button, buttonStyle]}>
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: COLORS.primary400,
  },
  buttonText: {
    fontFamily: 'Karla-Bold',
    color: COLORS.primary100,
    textAlign: 'center',
    fontSize: 18,
  },
  pressed: {
    opacity: 0.7,
  },
})
