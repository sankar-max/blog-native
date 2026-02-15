const SWR_KEYS = {
  POSTS: ['posts'],
  POST: (postId: number) => ['post', postId],
} as const;
export default SWR_KEYS;
