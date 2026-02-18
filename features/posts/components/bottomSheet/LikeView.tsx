import { View, Text, Image } from 'react-native';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { BottomSheet, BottomSheetRef } from '@/components/ui/BottomSheet';
import { PostListItemsT, User } from '../../types';
import { usePostLikes } from '../../hooks/usePostLikes';
import { BottomSheetFlashList } from '@gorhom/bottom-sheet';

interface LikeViewProps {
  post: PostListItemsT;
}

export interface LikeViewRef {
  present: () => void;
  dismiss: () => void;
}

const LikeView = forwardRef<LikeViewRef, LikeViewProps>(({ post }, ref) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const { postLikes, isLoading } = usePostLikes(post.id);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetRef.current?.present(),
    dismiss: () => bottomSheetRef.current?.dismiss(),
  }));

  const renderHeader = () => (
    <View className="mb-2 px-6 pt-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-foreground text-xl font-bold tracking-tight">Likes</Text>
        <View className="bg-primary/10 rounded-full px-3 py-1">
          <Text className="text-primary text-xs font-bold">{postLikes?.total ?? 0}</Text>
        </View>
      </View>
      <View className="bg-border/50 mt-4 h-px w-full" />
    </View>
  );

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['50%', '90%']}>
      {isLoading ? (
        <View className="flex-1 items-center justify-center p-10">
          <Text className="text-muted-foreground animate-pulse text-sm font-medium">
            Loading likes...
          </Text>
        </View>
      ) : (
        <BottomSheetFlashList
          data={postLikes?.users ?? []}
          keyExtractor={(item: User) => item.id}
          estimatedItemSize={72}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }: { item: User }) => (
            <View className="active:bg-muted/30 flex-row items-center justify-between px-6 py-4">
              <View className="flex-row items-center gap-4">
                <View className="bg-muted h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-sm">
                  {item.image ? (
                    <Image source={{ uri: item.image }} className="h-full w-full" />
                  ) : (
                    <Text className="text-muted-foreground text-base font-bold">
                      {item.name[0].toUpperCase()}
                    </Text>
                  )}
                </View>
                <View className="gap-0.5">
                  <Text className="text-foreground text-base font-semibold">{item.name}</Text>
                  <Text className="text-muted-foreground text-sm">{item.email}</Text>
                </View>
              </View>
              <View className="bg-border/10 h-8 w-8 items-center justify-center rounded-full">
                <Text className="text-muted-foreground">›</Text>
              </View>
            </View>
          )}
        />
      )}
    </BottomSheet>
  );
});

export default LikeView;
