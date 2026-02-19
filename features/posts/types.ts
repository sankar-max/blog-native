export type PostListResponse = {
  posts: PostListItemsT[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PostListItemsT = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  authorId: string;
  deletedAt: string | null;
  author: {
    id: number;
    name: string;
    image: string;
  };
  totalLikes: number;
  totalComments: number;
  isLiked: boolean;
};

export type User = {
  id: string;
  name: string;
  image: string | null;
  email: string;
};
export type PostLikesResponse = {
  users: User[];
  total: number;
  totalPages: number;
};
export type PostCommentsResponse = {
  comments: Comments[];
  total: number;
  totalPages: number;
};


export type Comments = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
}