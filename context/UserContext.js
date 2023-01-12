import { createContext, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

const saveToken = async (key, value) => {
  await SecureStore.setItemAsync(key, value)
}

const deleteToken = async key => {
  await SecureStore.deleteItemAsync(key)
}

export const UserContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState()

  const authenticate = token => {
    setAuthToken(token)
    saveToken('bearerToken', token)
  }

  const logout = () => {
    setAuthToken(null)
    deleteToken('bearerToken')
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
