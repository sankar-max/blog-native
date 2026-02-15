import { Stack } from 'expo-router';

export default function HomeStack() {
  return (
    <Stack
      screenOptions={
        {
          // headerShown: true,
          // headerStyle: { backgroundColor: '#3b82f6' },
          // headerTintColor: '#fff',
          // headerTitleStyle: { fontWeight: 'bold' },
        }
      }>
      <Stack.Screen name="feed" options={{ title: 'Feed' }} />
      <Stack.Screen name="[id]" options={{ title: 'Post Detail' }} />
    </Stack>
  );
}
