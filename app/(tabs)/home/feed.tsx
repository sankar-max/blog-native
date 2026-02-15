import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { PostList } from '@/features/posts/components/PostList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, X } from 'lucide-react-native';
import { useDebounce } from '@/hooks/useDebounce';

type SearchParams = {
  search: string;
  page: number;
  limit: number;
};

export default function HomeScreen() {
  const [search, setSearch] = useState<SearchParams>({
    search: '',
    page: 1,
    limit: 10,
  });

  const debouncedSearch = useDebounce(search.search, 500);

  const { data, isLoading, error, refetch, isRefetching } = usePosts({
    ...search,
    search: debouncedSearch,
  });

  const handleSearch = (text: string) => {
    setSearch((prev) => ({
      ...prev,
      search: text,
    }));
  };

  const clearSearch = () => {
    setSearch((prev) => ({
      ...prev,
      search: '',
    }));
  };

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <PostList
        posts={data?.posts}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
        isRefetching={isRefetching}
        ListHeaderComponent={
          <View className="pt-2 pb-4">
            <View className="mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-foreground text-3xl font-bold tracking-tight">Discover</Text>
                <Text className="text-muted-foreground text-sm font-medium">
                  Read the latest stories & insights
                </Text>
              </View>
              <View className="bg-muted h-10 w-10 items-center justify-center rounded-full">
                <Text className="text-base">👋</Text>
              </View>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center gap-3">
              <View className="bg-muted ring-border h-12 flex-1 flex-row items-center rounded-2xl px-4 ring-1">
                <Search size={20} className="text-secondary mr-3" color={'white'} />
                <TextInput
                  className="text-foreground placeholder:text-muted-foreground flex-1 text-base font-medium"
                  placeholder="Search articles..."
                  placeholderTextColor="#9CA3AF"
                  value={search.search}
                  onChangeText={handleSearch}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="search"
                />
                {search.search.length > 0 && (
                  <TouchableOpacity
                    onPress={clearSearch}
                    className="bg-secondary rounded-full p-1"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <X size={14} className="text-muted-foreground" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
