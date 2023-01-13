import { StyleSheet, TextInput } from 'react-native'
import { COLORS } from '../../constants/GlobalStyles'

export const Input = ({ config }) => {
  const inputStyles = [styles.input]

  if (config?.multiline) {
    inputStyles.push(styles.multiline)
  }

  return <TextInput {...config} style={inputStyles} />
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.primary600,
    color: COLORS.primary100,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    opacity: 0.9,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
})
