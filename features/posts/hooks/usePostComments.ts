import { useQuery } from '@tanstack/react-query';
import { postService } from '../../service';
import SWR_KEYS from './use-swr-keys';

export const usePostComments = (postId: number, enabled: boolean = true) => {
 const {
  data: comments,
  isLoading: isCommentsLoading,
  error: commentsError,
  refetch,
 } = useQuery({
  queryKey: SWR_KEYS.POST_COMMENTS(postId),
  queryFn: async () => await postService.viewPostComments(postId),
  enabled: !!postId && enabled,
  // Ensure data is always considered stale so it refetches when re-enabled
  staleTime: 0,
  // Poll for updates every 10 seconds while enabled (modal is open)
  refetchInterval: enabled ? 10000 : false,
  refetchIntervalInBackground: false,
 });
 return { comments, isCommentsLoading, commentsError, refetch };
};
