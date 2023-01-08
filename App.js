import { useEffect } from 'react'
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
import { ProfileScreen } from './screens/ProfileScreen'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

SplashScreen.preventAutoHideAsync()

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

export default function App() {
  const [fontsLoaded] = useFonts({
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-Medium': require('./assets/fonts/Karla-Medium.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
  })

  // app wide font
  const customTextProps = {
    style: {
      fontFamily: 'Karla-Regular',
    },
  }

  useEffect(() => {
    const prepare = async () => {
      // simulate longer loading by waiting 1 second
      await new Promise(resolve => setTimeout(resolve, 1000))
      await SplashScreen.hideAsync()
    }

    if (fontsLoaded) {
      prepare()
      setCustomText(customTextProps)
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
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
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name='stars' size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name='You'
            component={ProfileScreen}
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
              title: 'Friends',
            }}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </>
  )
}
