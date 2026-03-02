import { postService } from '../../service';
import { useInfiniteQuery, } from '@tanstack/react-query';
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
  return useInfiniteQuery({
    queryKey: [...SWR_KEYS.POSTS, search, page, limit],
    queryFn: ({ pageParam }) => postService.getPosts({ search, cursor: pageParam, limit }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    refetchOnMount: "always",
  });
};

