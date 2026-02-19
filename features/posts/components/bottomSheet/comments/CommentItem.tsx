import React from 'react';
import { View, Text, Image } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { Comments } from '../../../types';

interface CommentItemProps {
  item: Comments;
}

const CommentItem = ({ item }: CommentItemProps) => (
  <View className="border-border/10 border-b px-6 py-4">
    <View className="flex-row gap-3">
      <View className="bg-muted border-border/20 h-10 w-10 items-center justify-center overflow-hidden rounded-full border shadow-sm">
        {item.author.image ? (
          <Image source={{ uri: item.author.image }} className="h-full w-full" />
        ) : (
          <Text className="text-muted-foreground text-sm font-bold">
            {item.author.name[0].toUpperCase()}
          </Text>
        )}
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-foreground text-sm font-bold">{item.author.name}</Text>
          <Text className="text-muted-foreground text-[10px]">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </Text>
        </View>
        <Text className="text-foreground/90 text-sm leading-5">{item.content}</Text>
      </View>
    </View>
  </View>
);

export default React.memo(CommentItem);
