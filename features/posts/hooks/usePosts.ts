import { postService } from '../service';
import { useQuery } from '@tanstack/react-query';
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
    queryKey: ['post'],
    queryFn: () => postService.getPosts({ search, page, limit }),
  });
};
