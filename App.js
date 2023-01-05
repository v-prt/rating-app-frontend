import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from './constants/GlobalStyles'
import { IconButton } from './components/ui/IconButton'

import { CategoriesList } from './screens/CategoriesList'
import { RatingsList } from './screens/RatingsList'
import { RecentRatingsList } from './screens/RecentRatingsList'
import { ManageRating } from './screens/ManageRating'
import { ProfileScreen } from './screens/ProfileScreen'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const RatingsScreens = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: COLORS.primary800,
        },
        headerTintColor: COLORS.primary100,
        headerShadowVisible: false,
        headerRight: () => {
          return (
            <IconButton
              icon='add'
              color={COLORS.primary100}
              onPress={() => navigation.navigate('ManageRating')}
            />
          )
        },
        tabBarStyle: {
          backgroundColor: COLORS.primary600,
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: COLORS.primary100,
        tabBarActiveTintColor: COLORS.primary200,
      })}>
      <BottomTabs.Screen
        name='Categories'
        component={CategoriesList}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name='list' size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name='RecentRatings'
        component={RecentRatingsList}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name='time' size={size} color={color} />,
          title: 'Recent',
        }}
      />
      <BottomTabs.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name='person' size={size} color={color} />,
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary800,
            },
            headerTintColor: COLORS.primary100,
            headerShadowVisible: false,
          }}>
          <Stack.Screen
            name='RatingsScreens'
            component={RatingsScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='RatingsList' component={RatingsList} />
          <Stack.Screen
            name='ManageRating'
            component={ManageRating}
            options={{
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
