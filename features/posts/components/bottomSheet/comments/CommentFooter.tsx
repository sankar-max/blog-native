import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomSheetFooter, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCreateComment } from '../../../hooks/useCreateComments';
import PressableBtn from '@/components/ui/PressableBtn';
import { Send } from 'lucide-react-native';

const CommentFooter = ({ postId, ...props }: any) => {
  const [comment, setComment] = useState('');
  const { createComment, isCreatingComment } = useCreateComment();

  const handleCreateComment = () => {
    if (!comment.trim()) return;
    createComment({ postId, content: comment.trim() });
    setComment('');
  };

  return (
    <BottomSheetFooter {...props} bottomInset={0}>
      <View className="border-border/50 bg-background flex-row items-end gap-3 border-t px-4 py-3 pb-8">
        <View className="bg-muted/50 border-border/30 flex-1 flex-row items-center rounded-2xl border px-4 py-2">
          <BottomSheetTextInput
            placeholder="Add a comment..."
            className="text-foreground flex-1 py-1 text-sm"
            value={comment}
            onChangeText={setComment}
            placeholderTextColor="#94a3b8"
            multiline
            textAlignVertical="center"
          />
        </View>
        <PressableBtn
          onPress={handleCreateComment}
          disabled={isCreatingComment || !comment.trim()}
          className={`h-10 w-10 items-center justify-center rounded-full text-blue-500 shadow-sm ${
            comment.trim() ? 'bg-primary' : 'bg-muted opacity-50'
          }`}>
          <Send size={18} color="red" />
        </PressableBtn>
      </View>
    </BottomSheetFooter>
  );
};

export default CommentFooter;
