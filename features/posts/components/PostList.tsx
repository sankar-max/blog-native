import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { PostCard } from './PostCard';
import { PostListItemsT } from '../types';
import { AlertCircle, FileText } from 'lucide-react-native';
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
  ListHeaderComponent,
}: PostListProps & { ListHeaderComponent?: React.ReactElement }) => {
  const renderEmptyComponent = () => {
    if (isLoading && !isRefetching) {
      return (
        <View className="flex-1 items-center justify-center p-8">
          <ActivityIndicator size="small" color="#D97706" />
        </View>
      );
    }

    if (error) {
      return (
        <Animated.View entering={FadeIn} className="flex-1 items-center justify-center p-8">
          <View className="bg-destructive/10 mb-4 rounded-full p-4">
            <AlertCircle size={32} className="text-destructive" />
          </View>
          <Text className="text-foreground mb-2 text-lg font-semibold">Failed to load stories</Text>
          <Text className="text-muted-foreground text-center text-sm">{error.message}</Text>
        </Animated.View>
      );
    }

    return (
      <Animated.View entering={FadeIn} className="flex-1 items-center justify-center p-8 pt-20">
        <View className="bg-muted mb-4 rounded-full p-6">
          <FileText size={40} className="text-muted-foreground" strokeWidth={1.5} />
        </View>
        <Text className="text-foreground text-xl font-semibold">No stories found</Text>
        <Text className="text-muted-foreground mt-2 text-center text-sm leading-relaxed">
          We couldn&apos;t find any articles matching your search.{'\n'}Try adjusting your keywords.
        </Text>
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => <PostCard key={item.id} post={item} index={index} />}
      contentContainerClassName="px-5 pb-10 pt-0 flex-grow-1"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor="#000000" />
      }
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};
