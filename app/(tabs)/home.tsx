import { View } from 'react-native';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { PostList } from '@/features/posts/components/PostList';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { data, isLoading, error, refetch, isRefetching } = usePosts({
    search: '',
    page: 1,
    limit: 10,
  });

  return (
    <View className="flex-1 bg-gray-50 dark:bg-black">
      <SafeAreaView edges={['top']} className="flex-1">
        <PostList
          posts={data?.posts}
          isLoading={isLoading}
          error={error}
          onRefresh={refetch}
          isRefetching={isRefetching}
        />
      </SafeAreaView>
    </View>
  );
}
