import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../api/client';
import type { ForumPost, CommentItem, UserQuestionsStats } from '../types/forum';

export const useForumStore = defineStore('forum', () => {
  const posts = ref<ForumPost[]>([]);
  const currentPost = ref<ForumPost | null>(null);
  const searchQuery = ref<string>('');
  const loading = ref<boolean>(false);
  const loadingDetail = ref<boolean>(false);
  const error = ref<string | null>(null);
  const createModalOpen = ref<boolean>(false);
  const userStats = ref<UserQuestionsStats | null>(null);

  async function fetchPosts() {
    loading.value = true;
    error.value = null;
    try {
      const params: Record<string, string> = {};
      if (searchQuery.value.trim()) {
        params.search = searchQuery.value.trim();
      }
      const data = await api.get<ForumPost[]>('/posts', params);
      posts.value = data;
    } catch (err: any) {
      error.value = err.message || 'خطا در دریافت لیست پرسش‌ها';
    } finally {
      loading.value = false;
    }
  }

  async function fetchUserStats() {
    try {
      const stats = await api.get<UserQuestionsStats>('/posts/my-stats');
      userStats.value = stats;
      return stats;
    } catch {
      // If unauthenticated or error, ignore
      return null;
    }
  }

  async function uploadImages(files: File[]): Promise<string[]> {
    if (!files || files.length === 0) return [];
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const res = await api.upload<{ urls: string[] }>('/posts/upload', formData);
    return res.urls || [];
  }

  async function fetchPostById(id: number) {
    loadingDetail.value = true;
    error.value = null;
    try {
      const post = await api.get<ForumPost>(`/posts/${id}`);
      currentPost.value = post;
      return post;
    } catch (err: any) {
      error.value = err.message || 'خطا در بارگذاری پرسش';
      throw err;
    } finally {
      loadingDetail.value = false;
    }
  }

  async function createPost(payload: { title: string; content: string; images?: string[] }) {
    loading.value = true;
    error.value = null;
    try {
      const newPost = await api.post<ForumPost>('/posts', payload);
      posts.value.unshift(newPost);
      createModalOpen.value = false;
      await fetchUserStats();
      return newPost;
    } catch (err: any) {
      error.value = err.message || 'خطا در ارسال پرسش';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function addComment(postId: number, content: string) {
    try {
      const newComment = await api.post<CommentItem>(`/posts/${postId}/comments`, { content });
      if (currentPost.value && currentPost.value.id === postId) {
        if (!currentPost.value.comments) {
          currentPost.value.comments = [];
        }
        currentPost.value.comments.push(newComment);
        currentPost.value.commentsCount = (currentPost.value.commentsCount || 0) + 1;
      }
      // Update in posts list as well
      const p = posts.value.find((item) => item.id === postId);
      if (p) {
        p.commentsCount = (p.commentsCount || 0) + 1;
      }
      return newComment;
    } catch (err: any) {
      throw err;
    }
  }

  async function deletePost(id: number) {
    try {
      await api.delete(`/posts/${id}`);
      posts.value = posts.value.filter((p) => p.id !== id);
      if (currentPost.value && currentPost.value.id === id) {
        currentPost.value = null;
      }
    } catch (err: any) {
      throw err;
    }
  }

  return {
    posts,
    currentPost,
    searchQuery,
    loading,
    loadingDetail,
    error,
    createModalOpen,
    userStats,
    fetchPosts,
    fetchPostById,
    fetchUserStats,
    uploadImages,
    createPost,
    addComment,
    deletePost,
  };
});
