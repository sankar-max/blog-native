const SWR_KEYS = {
  POSTS: ['posts'],
  POST: (postId: number) => ['post', postId],
  POST_LIKES: (postId: number) => ['post', postId, 'likes'],
} as const;
export default SWR_KEYS;
