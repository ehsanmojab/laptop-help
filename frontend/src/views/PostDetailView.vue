<template>
  <div class="post-detail-view" dir="rtl">
    <!-- Page Header (Matching Theme) -->
    <section class="page-header" id="post-detail-header">
      <div class="page-header__bg"></div>
      <div class="container page-header__content">
        <!-- Back Link & Breadcrumb -->
        <div class="breadcrumb-bar">
          <router-link to="/forum" class="back-link">
            <ArrowRight :size="18" />
            <span>بازگشت به تالار گفتگو</span>
          </router-link>
        </div>
        <h1 class="page-header__title">
          {{ post?.title || 'مشاهده پرسش' }}
        </h1>
      </div>
    </section>

    <div class="container main-content-wrap">
      <!-- Loading State -->
      <div v-if="forumStore.loadingDetail" class="detail-loading">
        <div class="skeleton-header">
          <div class="skeleton-avatar"></div>
          <div class="skeleton-meta">
            <div class="skeleton-line w-40"></div>
            <div class="skeleton-line w-24"></div>
          </div>
        </div>
        <div class="skeleton-line w-3/4 mb-4"></div>
        <div class="skeleton-line w-full mb-3"></div>
        <div class="skeleton-line w-5/6"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="!post" class="detail-error">
        <AlertTriangle :size="48" class="text-amber-500 mb-2" />
        <h3>پرسش مورد نظر پیدا نشد</h3>
        <router-link to="/forum" class="primary-btn mt-4">
          بازگشت به لیست پرسش‌ها
        </router-link>
      </div>

      <!-- Main Question Content -->
      <div v-else class="post-detail-content">
        <article class="question-card">
          <!-- Question Header -->
          <div class="question-header">
            <div class="author-block">
              <img
                :src="post.author?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'"
                :alt="(post.author?.firstName && post.author?.lastName ? post.author.firstName + ' ' + post.author.lastName : post.author?.username) || 'کاربر'"
                class="author-avatar-large"
              />
              <div class="author-meta">
                <span class="author-name-large">
                  {{ post.author?.firstName && post.author?.lastName ? post.author.firstName + ' ' + post.author.lastName : post.author?.username }}
                </span>
                <span class="post-time">{{ formatDate(post.createdAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Question Body -->
          <div class="question-text">{{ post.content }}</div>

          <!-- Attached Pictures Gallery (Up to 3 images) -->
          <div v-if="post.images && post.images.length > 0" class="question-gallery">
            <h4 class="gallery-title">
              <ImageIcon :size="16" class="text-cyan-500" />
              <span>تصاویر پیوست شده ({{ post.images.length }} تصویر):</span>
            </h4>
            <div class="gallery-grid">
              <div
                v-for="(imgUrl, idx) in post.images"
                :key="idx"
                class="gallery-item"
                @click="openLightbox(resolveImageUrl(imgUrl))"
                title="کلیک برای بزرگنمایی"
              >
                <img :src="resolveImageUrl(imgUrl)" alt="تصویر پیوست پرسش" class="gallery-img" />
                <div class="gallery-overlay">
                  <ZoomIn :size="20" class="text-white" />
                  <span>بزرگنمایی</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Question Stats & Actions -->
          <div class="question-footer">
            <div class="stats-group">
              <span class="stat-badge">
                <MessageSquare :size="16" />
                {{ post.comments?.length || 0 }} پاسخ ثبت شده
              </span>
            </div>

            <!-- Delete if owner -->
            <button
              v-if="authStore.user && authStore.user.id === post.authorId"
              class="delete-post-btn"
              @click="handleDeletePost"
              title="حذف این پرسش"
            >
              <Trash2 :size="16" />
              <span>حذف پرسش</span>
            </button>
          </div>
        </article>

        <!-- Answers Section -->
        <section class="answers-section">
          <div class="answers-header">
            <h2 class="answers-title">
              <MessageCircle :size="22" class="text-cyan-500" />
              <span>پاسخ‌ها و دیدگاه‌ها ({{ post.comments?.length || 0 }})</span>
            </h2>
          </div>

          <!-- Comments List -->
          <div v-if="post.comments && post.comments.length > 0" class="answers-list">
            <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="answer-card"
            >
              <div class="answer-card__header">
                <div class="answer-author">
                  <img
                    :src="comment.author?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=c'"
                    :alt="(comment.author?.firstName && comment.author?.lastName ? comment.author.firstName + ' ' + comment.author.lastName : comment.author?.username) || 'کاربر'"
                    class="answer-avatar"
                  />
                  <div>
                    <span class="answer-author-name">
                      {{ comment.author?.firstName && comment.author?.lastName ? comment.author.firstName + ' ' + comment.author.lastName : comment.author?.username }}
                    </span>
                    <span class="answer-date">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                </div>
              </div>
              <div class="answer-body">
                <p>{{ comment.content }}</p>
              </div>
            </div>
          </div>

          <!-- Empty Answers -->
          <div v-else class="no-answers-box">
            <MessageSquareDashed :size="40" class="text-cyan-500 opacity-60 mb-2" />
            <p>هنوز پاسخی برای این پرسش ثبت نشده است.</p>
            <p class="text-xs text-slate-400">اولین پاسخ را شما بنویسید!</p>
          </div>

          <!-- Add Comment Form -->
          <div class="reply-box">
            <h3 class="reply-title">ثبت پاسخ یا دیدگاه شما</h3>

            <div v-if="!authStore.isAuthenticated" class="reply-auth-gate">
              <Lock :size="24" class="text-cyan-500 mb-2" />
              <p>برای ارسال پاسخ، لطفاً وارد حساب کاربری خود شوید.</p>
              <button class="primary-btn mt-3" @click="authStore.openLogin">
                ورود یا عضویت
              </button>
            </div>

            <form v-else @submit.prevent="submitReply" class="reply-form">
              <textarea
                v-model="replyText"
                rows="4"
                placeholder="پاسخ، پیشنهاد یا تجربه شخصی خود را درباره این سوال بنویسید..."
                required
                minlength="3"
                class="reply-textarea"
              ></textarea>
              <div class="reply-form-footer">
                <button
                  type="submit"
                  class="submit-reply-btn"
                  :disabled="submittingReply || !replyText.trim()"
                >
                  <span v-if="submittingReply" class="spinner"></span>
                  <span v-else>ارسال پاسخ</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="activeImage"
          class="lightbox-overlay"
          @click.self="activeImage = null"
        >
          <button class="lightbox-close" @click="activeImage = null" aria-label="بستن">
            <X :size="24" />
          </button>
          <img :src="activeImage" alt="بزرگنمایی تصویر پرسش" class="lightbox-img" />
        </div>
      </transition>
    </Teleport>

    <!-- Auth Modal -->
    <AuthModal />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useForumStore } from '../stores/forum';
import AuthModal from '../components/AuthModal.vue';
import {
  ArrowRight,
  MessageSquare,
  MessageCircle,
  Trash2,
  Lock,
  AlertTriangle,
  MessageSquareDashed,
  ImageIcon,
  ZoomIn,
  X,
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const forumStore = useForumStore();

const activeImage = ref<string | null>(null);

function openLightbox(url: string) {
  activeImage.value = url;
}

function resolveImageUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

const replyText = ref('');
const submittingReply = ref(false);

const post = computed(() => forumStore.currentPost);

async function loadPost() {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    await forumStore.fetchPostById(id);
  }
}

async function submitReply() {
  if (!replyText.value.trim() || !post.value) return;
  submittingReply.value = true;
  try {
    await forumStore.addComment(post.value.id, replyText.value.trim());
    replyText.value = '';
  } catch (err: any) {
    alert(err.message || 'خطا در ثبت پاسخ');
  } finally {
    submittingReply.value = false;
  }
}

async function handleDeletePost() {
  if (!post.value) return;
  if (confirm('آیا از حذف این پرسش اطمینان دارید؟')) {
    try {
      await forumStore.deletePost(post.value.id);
      router.push('/forum');
    } catch (err: any) {
      alert(err.message || 'خطا در حذف پرسش');
    }
  }
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

onMounted(() => {
  loadPost();
});
</script>

<style scoped>
.post-detail-view {
  min-height: 100vh;
  padding-bottom: 5rem;
  background-color: var(--color-neutral-50, #f8fafc);
  color: var(--color-neutral-900, #0f172a);
}

:global(html.dark) .post-detail-view {
  background-color: #0b1329;
  color: #f1f5f9;
}

/* ============================================
   Page Header (Matching Theme)
   ============================================ */
.page-header {
  position: relative;
  padding: calc(var(--nav-height) + var(--space-12, 3rem)) 0 var(--space-10, 2.5rem);
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
  max-width: 800px;
  margin: 0 auto;
}

.breadcrumb-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(3px);
}

.page-header__title {
  font-size: var(--font-size-3xl, 1.85rem);
  font-weight: 900;
  color: white;
  line-height: 1.4;
}

.main-content-wrap {
  margin-top: 2rem;
}

.question-card {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #e2e8f0;
  padding: 2.25rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  margin-bottom: 2rem;
}

:global(html.dark) .question-card {
  background: #0f172a;
  border-color: #1e293b;
  box-shadow: none;
}

.question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.author-block {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.author-avatar-large {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  background: #f1f5f9;
}

:global(html.dark) .author-avatar-large {
  border-color: #334155;
  background: #1e293b;
}

.author-name-large {
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
}

:global(html.dark) .author-name-large {
  color: #ffffff;
}

.post-time {
  font-size: 0.8rem;
  color: #94a3b8;
  display: block;
}

.question-text {
  font-size: 1.05rem;
  line-height: 1.85;
  color: #334155;
  white-space: pre-wrap;
  margin-bottom: 1.5rem;
}

:global(html.dark) .question-text {
  color: #cbd5e1;
}

/* Question Gallery */
.question-gallery {
  margin: 1.25rem 0 1.75rem;
  padding: 1rem;
  background: rgba(6, 182, 212, 0.04);
  border: 1px solid rgba(6, 182, 212, 0.15);
  border-radius: 1rem;
}

:global(html.dark) .question-gallery {
  background: rgba(6, 182, 212, 0.06);
  border-color: rgba(6, 182, 212, 0.2);
}

.gallery-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.85rem;
}

:global(html.dark) .gallery-title {
  color: #f1f5f9;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.gallery-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(6, 182, 212, 0.25);
  border-color: #06b6d4;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background-color: rgba(11, 19, 41, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-close:hover {
  background: rgba(239, 68, 68, 0.8);
}

.lightbox-img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 0.85rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
}

.question-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
}

:global(html.dark) .question-footer {
  border-top-color: #1e293b;
}

.stats-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0284c7;
}

:global(html.dark) .stat-badge {
  color: #38bdf8;
}

.delete-post-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-post-btn:hover {
  background: rgba(239, 68, 68, 0.15);
}

/* Answers Section */
.answers-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.answers-header {
  display: flex;
  align-items: center;
}

.answers-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

:global(html.dark) .answers-title {
  color: #ffffff;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer-card {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

:global(html.dark) .answer-card {
  background: #0f172a;
  border-color: #1e293b;
}

.answer-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.answer-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.answer-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid #e2e8f0;
  background: #f1f5f9;
}

:global(html.dark) .answer-avatar {
  border-color: #334155;
  background: #1e293b;
}

.answer-author-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
  display: block;
}

:global(html.dark) .answer-author-name {
  color: #ffffff;
}

.answer-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.answer-body {
  font-size: 0.925rem;
  line-height: 1.7;
  color: #334155;
  white-space: pre-wrap;
}

:global(html.dark) .answer-body {
  color: #cbd5e1;
}

.no-answers-box {
  padding: 2.5rem;
  text-align: center;
  border: 1px dashed #cbd5e1;
  border-radius: 1rem;
  background: #ffffff;
}

:global(html.dark) .no-answers-box {
  background: #0f172a;
  border-color: #1e293b;
}

/* Reply Box */
.reply-box {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #e2e8f0;
  padding: 1.75rem;
  margin-top: 1rem;
}

:global(html.dark) .reply-box {
  background: #0f172a;
  border-color: #1e293b;
}

.reply-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
}

:global(html.dark) .reply-title {
  color: #ffffff;
}

.reply-auth-gate {
  padding: 2rem;
  text-align: center;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px dashed #cbd5e1;
}

:global(html.dark) .reply-auth-gate {
  background: #1e293b;
  border-color: #334155;
}

.reply-textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  background: #f8fafc;
  color: #0f172a;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease;
}

:global(html.dark) .reply-textarea {
  background: #1e293b;
  border-color: #334155;
  color: #f8fafc;
}

.reply-textarea:focus {
  border-color: #0ea5e9;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

:global(html.dark) .reply-textarea:focus {
  background: #0f172a;
  border-color: #38bdf8;
}

.reply-form-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
}

.submit-reply-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  background: linear-gradient(135deg, #0284c7, #06b6d4);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-reply-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.25rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #0284c7, #06b6d4);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
</style>
