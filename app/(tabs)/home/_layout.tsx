import { Stack } from 'expo-router';
import { Text, View, Appearance } from 'react-native';
import { useColorScheme } from 'nativewind';

export default function HomeStack() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: isDark ? '#000' : '#fff' },
        headerTintColor: isDark ? '#fff' : '#000',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: 'transparent' },
        headerBackTitle: '',
      }}>
      <Stack.Screen name="feed" options={{ title: 'Feed' }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Post Detail',
          headerBackTitle: '',
          headerBackButtonMenuEnabled: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
}
