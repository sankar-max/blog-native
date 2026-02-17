import { useQuery } from '@tanstack/react-query';
import { postService } from '../../service';
import SWR_KEYS from './use-swr-keys';

export const usePostLikes = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: SWR_KEYS.POST_LIKES(id),
    queryFn: () => postService.viewPostLikes(id),
  });

  return {
    postLikes: data,
    isLoading,
    error,
  };
};
