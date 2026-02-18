import api from '@/lib/axios-instance';
import { PostListResponse, PostListItemsT, PostLikesResponse, PostCommentsResponse } from '../posts/types';
import { POST_API_CONSTANTS } from './endpoints';

class PostService {
  async getPosts({ search, page, limit }: { search?: string; page?: number; limit?: number }) {
    const response = await api.get<PostListResponse>(POST_API_CONSTANTS.GET_POSTS, {
      params: { search, page, limit },
    });

    return response.data;
  }

  async getPost(id: number) {
    const response = await api.get<PostListItemsT>(POST_API_CONSTANTS.GET_POST(id));
    return response.data;
  }
  async deletePost(id: number) {
    const response = await api.delete<PostLikesResponse>(POST_API_CONSTANTS.DELETE_POST(id));
    return response.data;
  }
  async toggleLikePost(id: number) {
    try {
      const response = await api.post<PostLikesResponse>(POST_API_CONSTANTS.LIKE_POST, {
        postId: id.toString(),
      });
      return response.data;
    } catch (error) {
      console.error('error😂', error);
    }
  }

  async viewPostLikes(id: number) {
    const response = await api.get<PostLikesResponse>(POST_API_CONSTANTS.VIEW_POST_LIKES(id));
    return response.data;
  }
  async viewPostComments(id: number) {
    const response = await api.get<PostCommentsResponse>(POST_API_CONSTANTS.VIEW_POST_COMMENTS(id));
    return response.data;
  }
  async createComment({ postId, content }: { postId: number; content: string }) {
    try {
      const response = await api.post<PostLikesResponse>(POST_API_CONSTANTS.CREATE_COMMENT(postId), { content });
      return response.data;
    } catch (error) {
      console.error('error sss😂', error);
    }
  }

}
export const postService = new PostService();
