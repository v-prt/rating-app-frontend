import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/GlobalStyles'

export const ActionButton = ({ children, onPress, style }) => {
  let buttonStyle = styles.button
  let buttonTextStyle = styles.buttonText

  if (style) {
    buttonStyle = {
      ...buttonStyle,
      ...style,
    }
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={buttonStyle}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: COLORS.primary200,
  },
  buttonText: {
    color: COLORS.primary100,
    textAlign: 'center',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
})
