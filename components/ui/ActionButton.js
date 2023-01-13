import { Pressable, StyleSheet, ActivityIndicator, Text, View } from 'react-native'
import { COLORS } from '../../constants/GlobalStyles'

export const ActionButton = ({ children, onPress, buttonStyle, loading, textStyle }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={[styles.button, buttonStyle]}>
        {loading ? (
          <ActivityIndicator size='small' color={COLORS.primary100} />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{children}</Text>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Karla-Bold',
    textAlign: 'center',
    fontSize: 18,
  },
  pressed: {
    opacity: 0.7,
  },
})
