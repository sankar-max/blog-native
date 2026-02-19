import { View } from 'react-native';
import { Stack } from 'expo-router';
import '../global.css';
import { QueryProvider } from '../providers/QueryProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <View className="bg-background flex-1">
              <Stack
                screenOptions={{
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
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
