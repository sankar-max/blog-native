import { useQuery } from '@tanstack/react-query';
import { postService } from '../../service';
import { PostListItemsT } from '../types';
import SWR_KEYS from './use-swr-keys';

export const usePost = (id: number) => {
  const { data, error, isLoading } = useQuery<PostListItemsT>({
    queryKey: SWR_KEYS.POST(id),
    queryFn: () => postService.getPost(id),
  });

  return {
    post: data,
    isLoading,
    error,
  };
};
