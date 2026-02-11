import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import { Link } from 'expo-router';
import { ArrowRight, Heart, MessageCircle } from 'lucide-react-native';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PostListItemsT } from '../types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PostCard = ({ post, index }: { post: PostListItemsT; index: number }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.98);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      className="mb-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Link href={`/(tabs)/home`} asChild>
        <AnimatedPressable
          style={animatedStyle}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          className="relative">
          {/* Gradient Overlay (Optional, for flair) */}
          <LinearGradient
            colors={['rgba(59, 130, 246, 0.05)', 'transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 z-0"
          />

          <View className="p-6">
            {/* Header: Author & Date */}
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <View className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-gray-100 dark:ring-gray-700">
                  <Image
                    source={{ uri: post.author.image }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {post.author.name}
                </Text>
              </View>
              <Text className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                {format(new Date(post.createdAt), 'MMM d')}
              </Text>
            </View>

            {/* Content */}
            <Text className="mb-2 text-xl leading-tight font-bold text-gray-900 dark:text-white">
              {post.title}
            </Text>

            <Text
              numberOfLines={3}
              className="mb-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {post.excerpt}
            </Text>

            {/* Footer: Stats & Action */}
            <View className="mt-auto flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                {/* Likes */}
                <View className="flex-row items-center gap-1.5">
                  <Heart
                    size={16}
                    color={post.isLiked ? '#ef4444' : '#9ca3af'}
                    fill={post.isLiked ? '#ef4444' : 'transparent'}
                  />
                  <Text
                    className={`text-xs font-medium ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500'
                    }`}>
                    {post.totalLikes}
                  </Text>
                </View>

                {/* Comments */}
                <View className="flex-row items-center gap-1.5">
                  <MessageCircle size={16} color="#9ca3af" />
                  <Text className="text-xs font-medium text-gray-500">{post.totalComments}</Text>
                </View>
              </View>

              {/* CTA */}
              <View className="flex-row items-center gap-1">
                <Text className="text-xs font-bold text-blue-600">Read Story</Text>
                <ArrowRight size={14} color="#2563eb" />
              </View>
            </View>
          </View>
        </AnimatedPressable>
      </Link>
    </Animated.View>
  );
};
