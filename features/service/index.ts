import api from '@/lib/axios-instance';
import { PostListResponse, PostListItemsT } from '../posts/types';
import { ENDPOINTS } from './endpoints';

class PostService {
  async getPosts({ search, page, limit }: { search?: string; page?: number; limit?: number }) {
    const response = await api.get<PostListResponse>(ENDPOINTS.GET_POSTS, {
      params: { search, page, limit },
    });

    return response.data;
  }

  async getPost(id: number) {
    const response = await api.get<PostListItemsT>(`${ENDPOINTS.GET_POSTS}/${id}`);
    return response.data;
  }

  async toggleLikePost(id: number) {
    try {
      const response = await api.post<PostListItemsT>(`${ENDPOINTS.LIKE_POST}`, {
        postId: id.toString(),
      });
      return response.data;
    } catch (error) {
      console.error('error😂', error);
    }
  }
}
export const postService = new PostService();
