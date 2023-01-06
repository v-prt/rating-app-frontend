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
import { RatingDetails } from './screens/RatingDetails'
import { ManageRating } from './screens/ManageRating'
import { ProfileScreen } from './screens/ProfileScreen'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

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
          headerTitle: 'All Ratings',
          headerRight: () => {
            return (
              <IconButton
                icon='add'
                color={COLORS.primary100}
                onPress={() => navigation.navigate('ManageRating')}
              />
            )
          },
        })}
      />
      <Stack.Screen name='RatingsList' component={RatingsList} />
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
              tabBarIcon: ({ color, size }) => <Ionicons name='list' size={size} color={color} />,
            }}
          />
          <BottomTabs.Screen
            name='RecentRatings'
            component={RecentRatingsList}
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name='time' size={size} color={color} />,
              headerTitle: 'Recent Ratings',
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
      </NavigationContainer>
    </>
  )
}
