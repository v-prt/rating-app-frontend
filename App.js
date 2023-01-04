import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from './constants/GlobalStyles'
import { IconButton } from './components/ui/IconButton'

import { Categories } from './screens/Categories'
import { RecentRatings } from './screens/RecentRatings'
import { ManageRating } from './screens/ManageRating'
import { Settings } from './screens/Settings'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const RatingsScreens = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: COLORS.primary200,
        },
        headerTintColor: COLORS.primary400,
        headerShadowVisible: false,
        headerRight: () => {
          return (
            <IconButton
              icon='add'
              color={COLORS.primary400}
              onPress={() => navigation.navigate('ManageRating')}
            />
          )
        },
        tabBarStyle: {
          backgroundColor: COLORS.primary100,
        },
        tabBarInactiveTintColor: COLORS.primary300,
        tabBarActiveTintColor: COLORS.primary400,
      })}>
      <BottomTabs.Screen
        name='Categories'
        component={Categories}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name='list' size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name='RecentRatings'
        component={RecentRatings}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name='time' size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name='settings' size={size} color={color} />,
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='RatingsScreens'
            component={RatingsScreens}
            options={{ headerShown: false }}
          />
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
