<template>
  <div class="forum-view" dir="rtl">
    <!-- Page Header (Matching Website Theme & Gradient) -->
    <section class="page-header" id="forum-header">
      <div class="page-header__bg"></div>
      <div class="container page-header__content">
        <div class="forum-badge">
          <MessagesSquare :size="16" class="text-cyan-300" />
          <span>تالار گفتگو و تبادل نظر</span>
        </div>
        <h1 class="page-header__title">
          پرسش و پاسخ تخصصی <span>خرید لپتاپ</span>
        </h1>
        <p class="page-header__subtitle">
          سوالات و نیازهای خود را مطرح کنید تا مشاوران و اعضای جامعه شما را در انتخاب بهترین لپتاپ راهنمایی کنند.
        </p>

        <!-- Action CTA -->
        <div class="forum-hero__actions">
          <button
            class="new-post-btn"
            id="forum-new-post-btn"
            @click="handleOpenNewPost"
          >
            <PlusCircle :size="20" />
            <span>ارسال پرسش جدید</span>
          </button>
          <div v-if="!authStore.isAuthenticated" class="auth-hint">
            <span>برای ارسال پرسش، ابتدا وارد شوید</span>
            <button class="auth-hint__link" @click="authStore.openLogin">
              ورود / عضویت
            </button>
          </div>
          <div v-else-if="forumStore.userStats" class="auth-hint auth-hint--stats">
            <span v-if="forumStore.userStats.remaining > 0">
              سهمیه شما: <strong>{{ forumStore.userStats.used }} از ۷ سوال</strong> ({{ forumStore.userStats.remaining }} باقیمانده)
            </span>
            <span v-else class="quota-exhausted">
              ⚠️ سقف مجاز ثبت ۷ پرسش برای شما پر شده است
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Forum Main Content -->
    <section class="forum-body">
      <div class="container">
        <!-- Search Bar -->
        <div class="forum-controls">
          <div class="forum-search-box">
            <Search :size="18" class="search-icon" />
            <input
              type="text"
              v-model="forumStore.searchQuery"
              @input="onSearchInput"
              placeholder="جستجو در میان پرسش‌ها (مثلاً: مهندسی، برنامه‌نویسی، بودجه، سبک...)"
              class="forum-search-input"
            />
            <button
              v-if="forumStore.searchQuery"
              class="clear-search-btn"
              @click="clearSearch"
            >
              <X :size="16" />
            </button>
          </div>
        </div>

        <!-- Posts Count Info -->
        <div class="forum-stats-bar">
          <div class="stats-text">
            <span>تعداد پرسش‌ها:</span>
            <strong>{{ forumStore.posts.length }} پرسش</strong>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="forumStore.loading" class="forum-loading-grid">
          <div v-for="n in 3" :key="n" class="post-card-skeleton">
            <div class="skeleton-header">
              <div class="skeleton-avatar"></div>
              <div class="skeleton-meta">
                <div class="skeleton-line w-32"></div>
                <div class="skeleton-line w-20"></div>
              </div>
            </div>
            <div class="skeleton-line w-3/4 mb-3"></div>
            <div class="skeleton-line w-full mb-2"></div>
            <div class="skeleton-line w-4/5"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="forumStore.posts.length === 0" class="forum-empty">
          <div class="empty-icon-wrap">
            <MessageSquareDashed :size="48" class="text-cyan-500" />
          </div>
          <h3 class="empty-title">هنوز پرسشی ثبت نشده است!</h3>
          <p class="empty-subtitle">
            اولین نفری باشید که سوال یا درخواست مشاوره خرید لپتاپ خود را ثبت می‌کند.
          </p>
          <button class="empty-action-btn" @click="handleOpenNewPost">
            <PlusCircle :size="18" />
            <span>ثبت اولین پرسش</span>
          </button>
        </div>

        <!-- Posts List -->
        <div v-else class="forum-posts-grid">
          <article
            v-for="post in forumStore.posts"
            :key="post.id"
            class="post-card"
          >
            <!-- Card Header -->
            <div class="post-card__header">
              <div class="author-info">
                <img
                  :src="post.author?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'"
                  :alt="(post.author?.firstName && post.author?.lastName ? post.author.firstName + ' ' + post.author.lastName : post.author?.username) || 'کاربر'"
                  class="author-avatar"
                  loading="lazy"
                />
                <div class="author-details">
                  <span class="author-name">
                    {{ post.author?.firstName && post.author?.lastName ? post.author.firstName + ' ' + post.author.lastName : (post.author?.username || 'کاربر') }}
                  </span>
                  <span class="post-date">{{ formatDate(post.createdAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Card Body -->
            <div class="post-card__body">
              <router-link :to="`/forum/${post.id}`" class="post-title-link">
                <h2 class="post-title">{{ post.title }}</h2>
              </router-link>
              <p class="post-excerpt">{{ post.content }}</p>

              <!-- Attached Images Preview -->
              <div v-if="post.images && post.images.length > 0" class="post-card__images">
                <div
                  v-for="(imgUrl, idx) in post.images"
                  :key="idx"
                  class="post-thumbnail-wrap"
                >
                  <img :src="resolveImageUrl(imgUrl)" alt="تصویر پیوست پرسش" class="post-thumbnail" loading="lazy" />
                </div>
                <span class="images-count-tag">
                  <ImageIcon :size="13" />
                  <span>{{ post.images.length }} تصویر</span>
                </span>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="post-card__footer">
              <div class="post-stats">
                <div class="stat-item" title="تعداد پاسخ‌ها">
                  <MessageCircle :size="16" class="stat-icon text-cyan-500" />
                  <span>{{ post.commentsCount ?? (post.comments?.length || 0) }} پاسخ</span>
                </div>
              </div>

              <router-link :to="`/forum/${post.id}`" class="view-post-btn">
                <span>مشاهده و ارسال پاسخ</span>
                <ChevronLeft :size="16" />
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <AuthModal />
    <CreatePostModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useForumStore } from '../stores/forum';
import AuthModal from '../components/AuthModal.vue';
import CreatePostModal from '../components/CreatePostModal.vue';
import {
  MessagesSquare,
  PlusCircle,
  Search,
  X,
  MessageCircle,
  ChevronLeft,
  MessageSquareDashed,
  ImageIcon,
} from 'lucide-vue-next';

const authStore = useAuthStore();
const forumStore = useForumStore();

let searchTimeout: any = null;

function onSearchInput() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    forumStore.fetchPosts();
  }, 350);
}

function clearSearch() {
  forumStore.searchQuery = '';
  forumStore.fetchPosts();
}

function handleOpenNewPost() {
  if (!authStore.isAuthenticated) {
    authStore.openLogin();
  } else {
    forumStore.createModalOpen = true;
  }
}

function resolveImageUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fa-IR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateStr;
  }
}

watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (isAuth) {
      forumStore.fetchUserStats();
    }
  },
);

onMounted(() => {
  forumStore.fetchPosts();
  if (authStore.isAuthenticated) {
    forumStore.fetchUserStats();
  }
});
</script>

<style scoped>
.forum-view {
  min-height: 100vh;
  background-color: var(--color-neutral-50, #f8fafc);
  color: var(--color-neutral-900, #0f172a);
}

:global(html.dark) .forum-view {
  background-color: #0b1329;
  color: #f1f5f9;
}

/* ============================================
   Page Header (Dark Gradient - Matching Theme)
   ============================================ */
.page-header {
  position: relative;
  padding: calc(var(--nav-height) + var(--space-12, 3rem)) 0 var(--space-12, 3rem);
  overflow: hidden;
  text-align: center;
}

.page-header__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-primary-800, #083344) 0%, var(--color-primary-600, #0284c7) 50%, var(--color-accent-600, #0d9488) 100%);
}

.page-header__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, hsla(170, 60%, 50%, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 30%, hsla(195, 65%, 60%, 0.1) 0%, transparent 50%);
}

.page-header__content {
  position: relative;
  z-index: 1;
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.forum-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
}

.page-header__title {
  font-size: var(--font-size-4xl, 2.25rem);
  font-weight: 900;
  color: white;
  margin-bottom: 0.25rem;
}

.page-header__title span {
  background: linear-gradient(135deg, #38bdf8, #a5f3fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-header__subtitle {
  font-size: var(--font-size-lg, 1.1rem);
  color: hsla(195, 30%, 88%, 0.95);
  max-width: 650px;
  line-height: 1.8;
}

.forum-hero__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.new-post-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, #0284c7, #06b6d4);
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease;
}

.new-post-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 26px rgba(6, 182, 212, 0.45);
}

.auth-hint {
  font-size: 0.825rem;
  color: hsla(195, 30%, 85%, 0.9);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.auth-hint--stats {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  color: #f1f5f9;
}

.quota-exhausted {
  color: #fca5a5;
  font-weight: 700;
}

.auth-hint__link {
  border: none;
  background: transparent;
  color: #38bdf8;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
}

/* Post Images in Card */
.post-card__images {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.post-thumbnail-wrap {
  width: 52px;
  height: 52px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.post-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.post-card:hover .post-thumbnail {
  transform: scale(1.06);
}

.images-count-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #0284c7;
  background: rgba(6, 182, 212, 0.12);
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
}

:global(html.dark) .images-count-tag {
  color: #38bdf8;
  background: rgba(6, 182, 212, 0.18);
}

/* ============================================
   Forum Body & Posts
   ============================================ */
.forum-body {
  padding: 2.5rem 0 4rem;
}

.forum-controls {
  margin-bottom: 1.5rem;
}

.forum-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  right: 1rem;
  color: #94a3b8;
  pointer-events: none;
}

.clear-search-btn {
  position: absolute;
  left: 1rem;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.forum-search-input {
  width: 100%;
  padding: 0.85rem 2.75rem 0.85rem 2.5rem;
  border-radius: 1rem;
  border: 1.5px solid #e2e8f0;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

:global(html.dark) .forum-search-input {
  background: #0f172a;
  border-color: #1e293b;
  color: #f1f5f9;
  box-shadow: none;
}

.forum-search-input:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

.forum-stats-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

:global(html.dark) .forum-stats-bar {
  color: #94a3b8;
}

.stats-text strong {
  color: #0f172a;
  margin: 0 0.25rem;
}

:global(html.dark) .stats-text strong {
  color: #ffffff;
}

/* Posts List */
.forum-posts-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.post-card {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:global(html.dark) .post-card {
  background: #0f172a;
  border-color: #1e293b;
  box-shadow: none;
}

.post-card:hover {
  transform: translateY(-2px);
  border-color: #38bdf8;
  box-shadow: 0 8px 24px rgba(6, 182, 212, 0.12);
}

.post-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  background: #f1f5f9;
}

:global(html.dark) .author-avatar {
  border-color: #334155;
  background: #1e293b;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.author-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
}

:global(html.dark) .author-name {
  color: #ffffff;
}

.post-date {
  font-size: 0.775rem;
  color: #94a3b8;
}

.post-title-link {
  text-decoration: none;
  color: inherit;
}

.post-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.5;
  transition: color 0.2s;
}

:global(html.dark) .post-title {
  color: #f1f5f9;
}

.post-card:hover .post-title {
  color: #0284c7;
}

:global(html.dark) .post-card:hover .post-title {
  color: #38bdf8;
}

.post-excerpt {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.6;
  margin-top: 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:global(html.dark) .post-excerpt {
  color: #94a3b8;
}

.post-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

:global(html.dark) .post-card__footer {
  border-top-color: #1e293b;
}

.post-stats {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #0284c7;
}

:global(html.dark) .stat-item {
  color: #38bdf8;
}

.view-post-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0284c7;
  text-decoration: none;
  transition: transform 0.2s;
}

:global(html.dark) .view-post-btn {
  color: #38bdf8;
}

.view-post-btn:hover {
  transform: translateX(-4px);
}

/* Empty State */
.forum-empty {
  text-align: center;
  padding: 4rem 1.5rem;
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px dashed #cbd5e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

:global(html.dark) .forum-empty {
  background: #0f172a;
  border-color: #1e293b;
}

.empty-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 1.25rem;
  background: rgba(6, 182, 212, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

:global(html.dark) .empty-title {
  color: #ffffff;
}

.empty-subtitle {
  font-size: 0.9rem;
  color: #64748b;
}

:global(html.dark) .empty-subtitle {
  color: #94a3b8;
}

.empty-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  background: linear-gradient(135deg, #0284c7, #06b6d4);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(6, 182, 212, 0.3);
  transition: all 0.2s ease;
}

.empty-action-btn:hover {
  transform: translateY(-2px);
}

/* Skeletons */
.forum-loading-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.post-card-skeleton {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
}

:global(html.dark) .post-card-skeleton {
  background: #0f172a;
  border-color: #1e293b;
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.skeleton-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #e2e8f0;
  animation: pulse 1.5s infinite;
}

:global(html.dark) .skeleton-avatar {
  background: #1e293b;
}

.skeleton-line {
  height: 14px;
  border-radius: 6px;
  background: #e2e8f0;
  animation: pulse 1.5s infinite;
}

:global(html.dark) .skeleton-line {
  background: #1e293b;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (max-width: 640px) {
  .page-header__title {
    font-size: 1.75rem;
  }
}
</style>
