export const POST_API_CONSTANTS = {
  GET_POSTS: "/post",
  GET_POST: (id: number) => `/post/${id}`,
  CREATE_POST: "/post",
  UPDATE_POST: (id: number) => `/post/${id}`,
  DELETE_POST: (id: number) => `/post/${id}`,
  LIKE_POST: "/post/like",
  VIEW_POST_LIKES: (id: number) => `/post/${id}/like`,
}
