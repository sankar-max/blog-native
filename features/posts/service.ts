import api from '@/lib/axios-instance';
import { PostListResponse } from './types';

const endpoints = {
  GET_POSTS: '/post',
};

class PostService {
  async getPosts({ search, page, limit }: { search?: string; page?: number; limit?: number }) {
    const response = await api.get<PostListResponse>(endpoints.GET_POSTS, {
      params: { search, page, limit },
    });
    console.log('🚀 ~ PostService ~ getPosts ~ response.data:', response.data);
    return response.data;
  }
}
export const postService = new PostService();
