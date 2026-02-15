import { View } from 'react-native';
import { Stack } from 'expo-router';
import '../global.css';
import { QueryProvider } from '../providers/QueryProvider';

export default function RootLayout() {
  return (
    <QueryProvider>
      <View className="bg-background flex-1">
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#3b82f6' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ title: 'Sign In' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="write" options={{ title: 'Write Post' }} /> */}
        </Stack>
      </View>
    </QueryProvider>
  );
}
