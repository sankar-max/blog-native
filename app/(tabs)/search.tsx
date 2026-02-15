import { View, Text, TextInput } from 'react-native';

export default function SearchScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold text-blue-600">Search</Text>
      <Text className="mt-4 text-lg text-gray-600">Search posts here...</Text>

      <TextInput
        placeholder="Search posts..."
        className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-base text-gray-900 focus:border-blue-500"
      />
    </View>
  );
}
