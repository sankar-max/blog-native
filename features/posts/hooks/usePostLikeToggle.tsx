import { useMutation } from '@tanstack/react-query';
import { postService } from '../../service';
import { queryClient } from '@/lib/query-client';
import SWR_KEYS from './use-swr-keys';

export const useToggleLikePost = () => {
  const mutation = useMutation({
    mutationFn: async (id: number) => await postService.toggleLikePost(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: SWR_KEYS.POSTS });
      await queryClient.cancelQueries({ queryKey: SWR_KEYS.POST(id) });
    },
    onSuccess: async (data, id) => {
      await queryClient.invalidateQueries({ queryKey: SWR_KEYS.POSTS });
      await queryClient.invalidateQueries({ queryKey: SWR_KEYS.POST(id) });
    },
  });
  return { ...mutation, toggleLike: mutation.mutate };
};
