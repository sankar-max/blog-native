import { postService } from '@/features/service';
import { useMutation } from '@tanstack/react-query';
import SWR_KEYS from './use-swr-keys';
import { queryClient } from '@/lib/query-client';

export const useCreateComment = () => {
 const { mutate: createComment, isPending: isCreatingComment } = useMutation({
  // mutationKey: SWR_KEYS.POST_CREATE_COMMENT(postId),
  mutationFn: ({ postId, content }: { postId: number; content: string }) => postService.createComment({ postId, content }),
  onSuccess: async (_, { postId }) => {
   // Invalidate everything related to this post to ensure data freshness
   await Promise.all([
    queryClient.invalidateQueries({ queryKey: SWR_KEYS.POSTS }),
    queryClient.invalidateQueries({ queryKey: SWR_KEYS.POST(postId) }),
    queryClient.invalidateQueries({ queryKey: SWR_KEYS.POST_COMMENTS(postId) }),
   ]);
  },
 });
 return { createComment, isCreatingComment };
};