import { postService } from '../../service';
import { useQuery } from '@tanstack/react-query';
import SWR_KEYS from './use-swr-keys';
export const usePosts = ({
  search,
  page,
  limit,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [...SWR_KEYS.POSTS, search, page, limit],
    queryFn: () => postService.getPosts({ search, page, limit }),
  });
};
