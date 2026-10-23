export interface UserProfile {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface CommentItem {
  id: number;
  content: string;
  authorId: number;
  author: UserProfile;
  postId: number;
  createdAt: string;
}

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  images?: string[];
  authorId: number;
  author: UserProfile;
  comments?: CommentItem[];
  commentsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserQuestionsStats {
  totalAllowed: number;
  used: number;
  remaining: number;
  canPost: boolean;
}

export interface AuthResponse {
  user: UserProfile;
  accessToken: string;
}
