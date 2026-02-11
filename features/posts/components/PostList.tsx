import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { PostCard } from './PostCard';
import { PostListItemsT } from '../types';
import { AlertCircle } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface PostListProps {
  isLoading: boolean;
  error: Error | null;
  posts?: PostListItemsT[];
  onRefresh?: () => void;
  isRefetching?: boolean;
}

export const PostList = ({
  isLoading,
  error,
  posts = [],
  onRefresh,
  isRefetching = false,
}: PostListProps) => {
  if (isLoading && !isRefetching) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 font-medium text-gray-500">Fetching content...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <Animated.View entering={FadeIn} className="flex-1 items-center justify-center p-8">
        <View className="mb-4 rounded-full bg-red-50 p-4">
          <AlertCircle size={32} color="#ef4444" />
        </View>
        <Text className="mb-2 text-lg font-semibold text-gray-900">Could not load posts</Text>
        <Text className="text-center text-sm text-gray-500">{error.message}</Text>
      </Animated.View>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <Animated.View entering={FadeIn} className="flex-1 items-center justify-center p-8 pt-32">
        <Text className="text-xl font-medium text-gray-500">No stories found.</Text>
        <Text className="mt-2 text-sm text-gray-400">Try checking back later.</Text>
      </Animated.View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => <PostCard post={item} index={index} />}
      contentContainerClassName="p-6 pb-24"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#3b82f6" />
      }
    />
  );
};
