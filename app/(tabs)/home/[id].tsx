import { useLocalSearchParams, Stack } from 'expo-router';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  useWindowDimensions,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { usePost } from '@/features/posts/hooks/usePost';
import { format } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle } from 'lucide-react-native';
import { useToggleLikePost } from '@/features/posts/hooks/usePostLike';
import RenderHtml from 'react-native-render-html';

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const { post, isLoading, error } = usePost(Number(id));
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { mutate: toggleLikePost, isPending } = useToggleLikePost();

  if (isLoading) {
    return (
      <View className="bg-background flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#D97706" />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View className="bg-background flex-1 items-center justify-center">
        <Text className="text-destructive">Error loading post</Text>
      </View>
    );
  }

  const baseStyle = {
    color: isDark ? '#E5E7EB' : '#1F2937', // gray-200 : gray-800
    fontSize: 18,
    lineHeight: 28,
  };

  const tagsStyles = {
    p: {
      marginBottom: 16,
    },
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 16,
      marginTop: 24,
      color: isDark ? '#F9FAFB' : '#111827',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop: 20,
      color: isDark ? '#F9FAFB' : '#111827',
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 16,
      color: isDark ? '#F9FAFB' : '#111827',
    },
    a: {
      color: '#D97706', // primary color approximation
      textDecorationLine: 'none',
      fontWeight: '600',
    },
    img: {
      borderRadius: 12,
      marginVertical: 16,
    },
    pre: {
      backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
      padding: 12,
      borderRadius: 8,
      overflow: 'scroll',
    },
    code: {
      backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
      fontFamily: 'monospace',
      fontSize: 14,
    },
    li: {
      marginBottom: 6,
    },
  };

  return (
    <View className="bg-background flex-1">
      <Stack.Screen
      // options={{
      //   headerShown: true,
      //   title: '',
      //   headerBackTitle: 'Back',
      //   headerTransparent: true,
      //   headerTintColor: '#000',
      // }}
      />

      <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
        <ScrollView
          className="px-6 pt-6"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}>
          {/* Author Info */}
          <View className="flex-row items-center justify-between">
            <View className="mb-4 flex-row items-center">
              <Image
                source={{ uri: post.author.image }}
                className="bg-muted ring-border mr-3 h-10 w-10 rounded-full ring-1"
              />
              <View>
                <Text className="text-foreground font-semibold">{post.author.name}</Text>
                <Text className="text-muted-foreground text-xs">
                  {format(new Date(post.createdAt), 'MMM d, yyyy')} • 5 min read
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <Text>
                <Heart
                  onPress={() => toggleLikePost(post.id)}
                  disabled={isPending}
                  size={16}
                  color={post.isLiked ? '#EF4444' : '#9CA3AF'}
                  fill={post.isLiked ? '#EF4444' : 'transparent'}
                  className={post.isLiked ? 'text-destructive' : 'text-muted-foreground'}
                />{' '}
                {post.totalLikes}
              </Text>
              <Text className="text-muted-foreground">
                <MessageCircle size={13} className="text-muted-foreground" /> {post.totalComments}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text className="text-foreground mb-6 text-3xl leading-tight font-bold">
            {post.title}
          </Text>

          {/* Content */}
          <RenderHtml
            contentWidth={width - 48} // px-6 (24) * 2 = 48
            source={{ html: post.content }}
            baseStyle={baseStyle}
            // @ts-ignore
            tagsStyles={tagsStyles}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
