import { useQuery } from '@tanstack/react-query';
import { postService } from '../../service';
import SWR_KEYS from './use-swr-keys';

export const usePostLikes = (postId: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: SWR_KEYS.POST_LIKES(postId),
    queryFn: () => postService.viewPostLikes(postId),
  });

  return {
    postLikes: data,
    isLoading,
    error,
  };
};
