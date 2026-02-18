const SWR_KEYS = {
  POSTS: ['posts'],
  POST: (postId: number) => ['post', postId],
  POST_LIKES: (postId: number) => ['post', postId, 'likes'],
  POST_COMMENTS: (postId: number) => ['post', postId, 'comments'],
  POST_CREATE_COMMENT: (postId: number) => ['post', postId, 'create-comment'],
} as const;
export default SWR_KEYS;
