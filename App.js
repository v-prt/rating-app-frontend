import { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { setCustomText } from 'react-native-global-props'
import { COLORS } from './constants/GlobalStyles'

import { CategoriesList } from './screens/CategoriesList'
import { RatingsList } from './screens/RatingsList'
import { RecentRatingsList } from './screens/RecentRatingsList'
import { RatingDetails } from './screens/RatingDetails'
import { ManageRating } from './screens/ManageRating'
import { Friends } from './screens/Friends'
import { Profile } from './screens/Profile'
import { Login } from './screens/Login'
import { Signup } from './screens/Signup'
import * as SecureStore from 'expo-secure-store'
import { verifyToken } from './util/auth'
import { UserContextProvider, UserContext } from './context/UserContext'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

SplashScreen.preventAutoHideAsync()

const getSecureValue = async key => {
  const result = await SecureStore.getItemAsync(key)
  return result
}

const deleteToken = async key => {
  await SecureStore.deleteItemAsync(key)
}

const RatingsScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary800,
        },
        headerTintColor: COLORS.primary100,
      }}>
      <Stack.Screen
        name='CategoriesList'
        component={CategoriesList}
        options={({ navigation }) => ({
          headerTitle: 'All',
          headerLeft: ({ tintColor }) => {
            return (
              <MaterialIcons
                name='history'
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('RecentRatingsList')}
              />
            )
          },
          headerRight: ({ tintColor }) => {
            return (
              <MaterialIcons
                name='add'
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('ManageRating')}
              />
            )
          },
        })}
      />
      <Stack.Screen name='RatingsList' component={RatingsList} />
      <Stack.Screen
        name='RecentRatingsList'
        component={RecentRatingsList}
        options={{
          title: 'Recent',
        }}
      />
      <Stack.Screen name='RatingDetails' component={RatingDetails} />
      <Stack.Screen
        name='ManageRating'
        component={ManageRating}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  )
}

const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary800,
        },
        headerTintColor: COLORS.primary100,
      }}>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          title: 'Log In',
        }}
      />
      <Stack.Screen
        name='SignUp'
        component={Signup}
        options={{
          title: 'Create Account',
        }}
      />
    </Stack.Navigator>
  )
}

const AuthenticatedStack = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary800,
        },
        headerTintColor: COLORS.primary100,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary600,
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: COLORS.primary100,
        tabBarActiveTintColor: COLORS.primary200,
      }}>
      <BottomTabs.Screen
        name='Ratings'
        component={RatingsScreens}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name='stars' size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='account-circle' size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='Friends'
        component={Friends}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='group-work' size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}

const Navigation = () => {
  const { isAuthenticated } = useContext(UserContext)

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: COLORS.primary800,
        },
      }}>
      {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  )
}

const Root = () => {
  const [fontsLoaded] = useFonts({
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-Medium': require('./assets/fonts/Karla-Medium.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
  })

  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const { authenticate } = useContext(UserContext)

  // app-wide font / text style
  const customTextProps = {
    style: {
      fontFamily: 'Karla-Regular',
      color: COLORS.primary100,
    },
  }

  useEffect(() => {
    const prepare = async () => {
      // simulate longer loading by waiting 1 second
      await new Promise(resolve => setTimeout(resolve, 1000))
      await SplashScreen.hideAsync()
    }

    const fetchToken = async () => {
      const token = await getSecureValue('bearerToken')

      if (token) {
        response = await verifyToken(token)
        if (response.status === 200) {
          authenticate(token)
        } else {
          deleteToken('bearerToken')
        }
      }
    }

    if (fontsLoaded) {
      fetchToken()
      setIsTryingLogin(false)
      prepare()
      setCustomText(customTextProps)
    }
  }, [fontsLoaded])

  if (!fontsLoaded || isTryingLogin) {
    return null
  }

  return <Navigation />
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <UserContextProvider>
        <Root />
      </UserContextProvider>
    </>
  )
}
