import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../api/client';
import type { UserProfile, AuthResponse } from '../types/forum';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<UserProfile | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const authModalOpen = ref(false);
  const authModalTab = ref<'login' | 'register'>('login');

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  async function initAuth() {
    if (!token.value) {
      user.value = null;
      return;
    }
    try {
      loading.value = true;
      const profile = await api.get<UserProfile>('/auth/profile');
      user.value = profile;
    } catch (err: any) {
      console.warn('Failed to restore session:', err.message);
      logout();
    } finally {
      loading.value = false;
    }
  }

  async function login(username: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        username,
        password,
      });
      token.value = response.accessToken;
      user.value = response.user;
      localStorage.setItem('token', response.accessToken);
      authModalOpen.value = false;
      return response;
    } catch (err: any) {
      error.value = err.message || 'خطا در ورود به حساب';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function register(username: string, password: string, firstName: string, lastName: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post<AuthResponse>('/auth/register', {
        username,
        password,
        firstName,
        lastName,
      });
      token.value = response.accessToken;
      user.value = response.user;
      localStorage.setItem('token', response.accessToken);
      authModalOpen.value = false;
      return response;
    } catch (err: any) {
      error.value = err.message || 'خطا در ایجاد حساب کاربری';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  }

  function openLogin() {
    authModalTab.value = 'login';
    error.value = null;
    authModalOpen.value = true;
  }

  function openRegister() {
    authModalTab.value = 'register';
    error.value = null;
    authModalOpen.value = true;
  }

  function closeAuthModal() {
    authModalOpen.value = false;
    error.value = null;
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    authModalOpen,
    authModalTab,
    initAuth,
    login,
    register,
    logout,
    openLogin,
    openRegister,
    closeAuthModal,
  };
});
