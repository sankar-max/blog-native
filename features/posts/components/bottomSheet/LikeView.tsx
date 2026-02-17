import { View, Text, Button } from 'react-native';
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
    <View className="mb-4 pt-2">
      <Text className="text-foreground mb-6 text-center text-lg font-bold">Post Actions</Text>
      <View className="flex-row items-center justify-between px-4">
        <Text className="text-foreground font-semibold">Likes</Text>
        <View className="bg-secondary rounded-full px-3 py-1">
          <Text className="text-secondary-foreground text-xs font-bold">
            {postLikes?.total ?? 0}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['40%', '80%']}>
      {isLoading ? (
        <View className="flex-1 items-center justify-center p-10">
          <Text className="text-muted-foreground">Loading...</Text>
        </View>
      ) : (
        <BottomSheetFlashList
          data={postLikes?.users}
          keyExtractor={(item: User) => item.id}
          estimatedItemSize={64}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View className="border-border/5 flex-row items-center justify-between border-b px-4 py-3">
              <View className="flex-row items-center gap-3">
                <View className="bg-muted h-10 w-10 items-center justify-center rounded-full">
                  <Text className="text-muted-foreground font-bold">{item.name[0]}</Text>
                </View>
                <View>
                  <Text className="text-foreground font-medium">{item.name}</Text>
                  <Text className="text-muted-foreground text-xs">{item.email}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </BottomSheet>
  );
});

export default LikeView;
