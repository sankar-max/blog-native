import { Tabs } from 'expo-router';
import { Home, Search, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      // @ts-ignore: sceneContainerStyle is valid for BottomTabs but missing in Expo Router types
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' },
        // tabBarStyle: {
        //   backgroundColor: 'var(--background)',
        //   borderTopColor: 'var(--border)',
        // },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home title="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search title="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User title="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
