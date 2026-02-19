import { View, Text } from 'react-native';
import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { BottomSheet, BottomSheetRef } from '@/components/ui/BottomSheet';
import { Comments, PostListItemsT } from '../../../types';
import { BottomSheetFlashList } from '@gorhom/bottom-sheet';
import { usePostComments } from '../../../hooks/usePostComments';
import CommentFooter from './CommentFooter';
import CommentHeader from './CommentHeader';
import CommentItem from './CommentItem';
import CommentEmptyState from './CommentEmptyState';

interface CommentsProps {
  post: PostListItemsT;
}

export interface PostCommentsListRef {
  present: () => void;
  dismiss: () => void;
}

const PostCommentsList = forwardRef<PostCommentsListRef, CommentsProps>(({ post }, ref) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [isSheetVisible, setIsSheetVisible] = React.useState(false);

  const { comments, isCommentsLoading, refetch } = usePostComments(post.id, isSheetVisible);

  useImperativeHandle(ref, () => ({
    present: () => {
      setIsSheetVisible(true);
      bottomSheetRef.current?.present();
      // Force a fresh fetch every time the modal is opened
      refetch();
    },
    dismiss: () => {
      bottomSheetRef.current?.dismiss();
      setIsSheetVisible(false);
    },
  }));

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    setIsSheetVisible(false);
  }, []);

  const renderHeader = useCallback(
    () => <CommentHeader totalComments={post.totalComments ?? 0} onClose={handleClose} />,
    [post.totalComments, handleClose]
  );

  const renderFooter = useCallback(
    (props: any) => <CommentFooter {...props} postId={post.id} />,
    [post.id]
  );

  const renderItem = useCallback(({ item }: { item: Comments }) => <CommentItem item={item} />, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['50%', '90%']}
      footerComponent={renderFooter}
      onDismiss={handleClose}>
      {isCommentsLoading ? (
        <View className="flex-1 items-center justify-center p-10">
          <View className="border-primary h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" />
          <Text className="text-muted-foreground mt-4 text-sm font-medium">
            Loading comments...
          </Text>
        </View>
      ) : (
        <BottomSheetFlashList
          data={comments?.comments ?? []}
          keyExtractor={(item: Comments) => item.id.toString()}
          estimatedItemSize={88}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={CommentEmptyState}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
    </BottomSheet>
  );
});

export default PostCommentsList;
