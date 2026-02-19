import React from 'react';
import { View, Text } from 'react-native';
import { X } from 'lucide-react-native';
import PressableBtn from '@/components/ui/PressableBtn';

interface CommentHeaderProps {
  totalComments: number;
  onClose: () => void;
}

const CommentHeader = ({ totalComments, onClose }: CommentHeaderProps) => (
  <View className="border-border/50 border-b px-6 py-4">
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Text className="text-foreground text-xl font-bold tracking-tight">Comments</Text>
        <View className="bg-primary/10 rounded-full px-2 py-0.5">
          <Text className="text-primary text-xs font-bold">{totalComments}</Text>
        </View>
      </View>
      <PressableBtn
        onPress={onClose}
        className="bg-muted/50 h-8 w-8 items-center justify-center rounded-full">
        <X size={18} className="text-muted-foreground" />
      </PressableBtn>
    </View>
  </View>
);

export default CommentHeader;
