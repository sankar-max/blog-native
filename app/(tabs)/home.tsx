import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-3xl font-bold text-blue-600">Welcome to Blog Mobile</Text>
      <Text className="mt-4 text-lg text-gray-600">Posts will appear here soon...</Text>
    </View>
  );
}
