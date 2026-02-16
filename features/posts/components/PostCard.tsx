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
import { useToggleLikePost } from '../hooks/usePostLike';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PostCard = ({ post, index }: { post: PostListItemsT; index: number }) => {
  const scale = useSharedValue(1);
  const { mutate: toggleLikePost, isPending } = useToggleLikePost();
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
    <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
      <View className="border-border bg-card mb-6 overflow-hidden rounded-3xl border shadow-sm">
        <Link href={`/(tabs)/home/${post.id}`} asChild>
          <AnimatedPressable
            style={animatedStyle}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            className="relative">
            <View className="p-6">
              {/* Header: Author & Date */}
              <View className="mb-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="ring-border h-8 w-8 overflow-hidden rounded-full ring-1">
                    <Image
                      source={{ uri: post.author.image }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="text-muted-foreground text-xs font-semibold">
                    {post.author.name}
                  </Text>
                </View>
                <Text className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  {format(new Date(post.createdAt), 'MMM d')}
                </Text>
              </View>

              {/* Content */}
              <Text className="text-card-foreground mb-2 text-xl leading-tight font-bold">
                {post.title}
              </Text>

              <Text
                numberOfLines={3}
                className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {post.excerpt}
              </Text>

              {/* Footer: Stats & Action */}
              <View className="mt-auto flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  {/* Likes */}
                  <View className="flex-row items-center gap-1.5">
                    <Heart
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleLikePost(post.id);
                      }}
                      disabled={isPending}
                      size={16}
                      color={post.isLiked ? '#EF4444' : '#9CA3AF'}
                      fill={post.isLiked ? '#EF4444' : 'transparent'}
                      className={post.isLiked ? 'text-destructive' : 'text-muted-foreground'}
                    />
                    <Text
                      className={`text-xs font-medium ${
                        post.isLiked ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                      {post.totalLikes}
                    </Text>
                  </View>

                  {/* Comments */}
                  <View className="flex-row items-center gap-1.5">
                    <MessageCircle size={16} className="text-muted-foreground" />
                    <Text className="text-muted-foreground text-xs font-medium">
                      {post.totalComments}
                    </Text>
                  </View>
                </View>

                {/* CTA */}
                <View className="flex-row items-center gap-1">
                  <Text className="text-primary text-xs font-bold">Read Story</Text>
                  <ArrowRight size={14} color={'white'} />
                </View>
              </View>
            </View>
          </AnimatedPressable>
        </Link>
      </View>
    </Animated.View>
  );
};
