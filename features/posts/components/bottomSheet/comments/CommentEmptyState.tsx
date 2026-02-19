import React from 'react';
import { View, Text } from 'react-native';
import { MessageSquare } from 'lucide-react-native';

const CommentEmptyState = () => (
  <View className="flex-1 items-center justify-center px-10 py-20">
    <View className="bg-muted/30 mb-4 h-20 w-20 items-center justify-center rounded-full">
      <MessageSquare size={32} className="text-muted-foreground/50" />
    </View>
    <Text className="text-foreground mb-1 text-lg font-semibold">No comments yet</Text>
    <Text className="text-muted-foreground text-center text-sm">
      Be the first to share your thoughts on this post!
    </Text>
  </View>
);

export default CommentEmptyState;
