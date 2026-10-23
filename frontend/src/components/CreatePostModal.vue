<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="forumStore.createModalOpen"
        class="post-modal-overlay"
        @click.self="forumStore.createModalOpen = false"
      >
        <div class="post-modal-card" dir="rtl">
          <!-- Close Button -->
          <button
            class="post-modal-close"
            @click="forumStore.createModalOpen = false"
            aria-label="بستن"
          >
            <X :size="20" />
          </button>

          <!-- Header -->
          <div class="post-modal-header">
            <div class="header-icon-box">
              <MessageSquarePlus :size="24" class="text-cyan-500" />
            </div>
            <div>
              <h3 class="post-modal-title">ارسال پرسش جدید</h3>
              <p class="post-modal-subtitle">
                پرسش یا درخواست راهنمایی خرید لپتاپ خود را مطرح کنید
              </p>
            </div>
          </div>

          <!-- User Quota Bar (Max 7 Questions) -->
          <div v-if="forumStore.userStats" class="quota-box" :class="{ 'quota-box--full': !canSubmitQuestion }">
            <div class="quota-header">
              <div class="quota-title">
                <HelpCircle :size="16" class="text-cyan-500" />
                <span>سهمیه ثبت پرسش:</span>
              </div>
              <span class="quota-badge" :class="canSubmitQuestion ? 'quota-badge--ok' : 'quota-badge--danger'">
                {{ forumStore.userStats.used }} از {{ forumStore.userStats.totalAllowed }} پرسش استفاده شده
                ({{ forumStore.userStats.remaining }} پرسش باقیمانده)
              </span>
            </div>
            <div class="quota-bar-track">
              <div
                class="quota-bar-fill"
                :style="{ width: `${Math.min(100, (forumStore.userStats.used / forumStore.userStats.totalAllowed) * 100)}%` }"
                :class="{ 'quota-bar-fill--danger': forumStore.userStats.used >= forumStore.userStats.totalAllowed }"
              ></div>
            </div>
            <p v-if="!canSubmitQuestion" class="quota-warning-text">
              ⚠️ شما به سقف مجاز ارسال پرسش (۷ سوال) رسیده‌اید و امکان ارسال سوال جدید وجود ندارد.
            </p>
          </div>

          <!-- Error Alert -->
          <div v-if="localError" class="modal-error-alert">
            <AlertCircle :size="18" />
            <span>{{ localError }}</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="post-form">
            <!-- Title -->
            <div class="form-group">
              <label class="form-label" for="post-title">عنوان پرسش (خلاصه و رسا)</label>
              <input
                id="post-title"
                v-model="form.title"
                type="text"
                placeholder="مثال: بهترین لپتاپ تا سقف ۴۵ میلیون تومان برای کارهای دانشگاهی"
                required
                minlength="5"
                maxlength="200"
                class="form-input"
                :disabled="!canSubmitQuestion"
              />
              <span class="char-counter">{{ form.title.length }} / 200</span>
            </div>

            <!-- Content -->
            <div class="form-group">
              <label class="form-label" for="post-content">توضیحات و جزئیات نیاز شما</label>
              <textarea
                id="post-content"
                v-model="form.content"
                rows="4"
                placeholder="بودجه مد نظر، نرم‌افزارهای اصلی که با آن‌ها کار می‌کنید، و اولویت‌هایی مثل شارژدهی باتری یا سبک بودن را بنویسید..."
                required
                minlength="10"
                class="form-textarea"
                :disabled="!canSubmitQuestion"
              ></textarea>
            </div>

            <!-- Image Upload Section (Up to 3 images, max 3MB each) -->
            <div class="form-group images-section">
              <div class="images-section__header">
                <label class="form-label">
                  <ImageIcon :size="16" class="text-cyan-500 inline-icon" />
                  <span>افزودن تصویر (اختیاری)</span>
                </label>
                <span class="images-counter">
                  {{ selectedFiles.length }} از ۳ تصویر (حداکثر ۳ مگابایت به ازای هر عکس)
                </span>
              </div>

              <!-- Upload Button / Dropzone -->
              <div
                v-if="selectedFiles.length < 3 && canSubmitQuestion"
                class="dropzone-box"
                @click="triggerFileInput"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleFileDrop"
                :class="{ 'dropzone-box--dragging': isDragging }"
              >
                <input
                  ref="fileInputRef"
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  class="hidden-file-input"
                  @change="handleFileSelect"
                />
                <UploadCloud :size="26" class="text-cyan-500 dropzone-icon" />
                <div class="dropzone-text">
                  <span>برای انتخاب تصویر کلیک کنید یا عکس‌ها را اینجا بکشید</span>
                  <span class="dropzone-hint">فرمت‌های مجاز: JPG, PNG, WEBP, GIF (حداکثر ۳ مگابایت)</span>
                </div>
              </div>

              <!-- Image Previews List -->
              <div v-if="selectedFiles.length > 0" class="previews-grid">
                <div
                  v-for="(item, index) in selectedFiles"
                  :key="index"
                  class="preview-card"
                >
                  <img :src="item.previewUrl" :alt="item.file.name" class="preview-img" />
                  <div class="preview-overlay">
                    <span class="preview-size">{{ formatFileSize(item.file.size) }}</span>
                    <button
                      type="button"
                      class="remove-img-btn"
                      @click="removeFile(index)"
                      title="حذف تصویر"
                    >
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Helpful Tip -->
            <div class="consultation-tip">
              <HelpCircle :size="18" class="tip-icon" />
              <span>
                نکته: هرچه اطلاعات دقیق‌تری از بودجه و نحوه استفاده بنویسید، پیشنهادهای مشاوران برای شما کاربردی‌تر خواهد بود.
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="modal-actions">
              <button
                type="button"
                class="cancel-btn"
                @click="forumStore.createModalOpen = false"
              >
                انصراف
              </button>
              <button
                type="submit"
                class="submit-btn"
                :disabled="forumStore.loading || isSubmitting || !canSubmitQuestion"
              >
                <span v-if="forumStore.loading || isSubmitting" class="spinner"></span>
                <span v-else-if="!canSubmitQuestion">سقف ۷ پرسش تکمیل شده است</span>
                <span v-else-if="uploadingImages">در حال آپلود تصاویر...</span>
                <span v-else>ارسال و ثبت پرسش</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useForumStore } from '../stores/forum';
import {
  X,
  MessageSquarePlus,
  AlertCircle,
  HelpCircle,
  ImageIcon,
  UploadCloud,
  Trash2,
} from 'lucide-vue-next';

interface SelectedFileItem {
  file: File;
  previewUrl: string;
}

const forumStore = useForumStore();
const localError = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<SelectedFileItem[]>([]);
const isDragging = ref(false);
const isSubmitting = ref(false);
const uploadingImages = ref(false);

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

const canSubmitQuestion = computed(() => {
  if (!forumStore.userStats) return true;
  return forumStore.userStats.remaining > 0 && forumStore.userStats.canPost !== false;
});

const form = reactive({
  title: '',
  content: '',
});

watch(
  () => forumStore.createModalOpen,
  (open) => {
    if (open) {
      localError.value = null;
      forumStore.fetchUserStats();
    }
  },
);

onMounted(() => {
  forumStore.fetchUserStats();
});

function triggerFileInput() {
  fileInputRef.value?.click();
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement;
  if (input.files) {
    addFiles(Array.from(input.files));
  }
  input.value = '';
}

function handleFileDrop(e: DragEvent) {
  isDragging.value = false;
  if (e.dataTransfer?.files) {
    addFiles(Array.from(e.dataTransfer.files));
  }
}

function addFiles(files: File[]) {
  localError.value = null;

  for (const file of files) {
    if (selectedFiles.value.length >= 3) {
      localError.value = 'حداکثر ۳ تصویر می‌توانید ضمیمه پرسش خود کنید.';
      break;
    }

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|gif)$/i)) {
      localError.value = `فایل «${file.name}» فرمت تصویری معتبری ندارد (فقط JPG, PNG, WEBP, GIF).`;
      continue;
    }

    if (file.size > MAX_FILE_SIZE) {
      localError.value = `حجم تصویر «${file.name}» (${(file.size / (1024 * 1024)).toFixed(1)}MB) بیشتر از سقف مجاز ۳ مگابایت است.`;
      continue;
    }

    const previewUrl = URL.createObjectURL(file);
    selectedFiles.value.push({ file, previewUrl });
  }
}

function removeFile(index: number) {
  const item = selectedFiles.value[index];
  if (item?.previewUrl) {
    URL.revokeObjectURL(item.previewUrl);
  }
  selectedFiles.value.splice(index, 1);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function handleSubmit() {
  localError.value = null;

  if (!canSubmitQuestion.value) {
    localError.value = 'سقف مجاز ارسال پرسش برای هر کاربر حداکثر ۷ سوال است.';
    return;
  }

  if (form.title.trim().length < 5) {
    localError.value = 'عنوان پرسش باید حداقل ۵ کاراکتر باشد';
    return;
  }
  if (form.content.trim().length < 10) {
    localError.value = 'توضیحات پرسش باید حداقل ۱۰ کاراکتر باشد';
    return;
  }

  isSubmitting.value = true;
  try {
    let imageUrls: string[] = [];

    if (selectedFiles.value.length > 0) {
      uploadingImages.value = true;
      const rawFiles = selectedFiles.value.map((item) => item.file);
      imageUrls = await forumStore.uploadImages(rawFiles);
      uploadingImages.value = false;
    }

    await forumStore.createPost({
      title: form.title.trim(),
      content: form.content.trim(),
      images: imageUrls.length > 0 ? imageUrls : undefined,
    });

    // Reset Form
    form.title = '';
    form.content = '';
    selectedFiles.value.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    selectedFiles.value = [];
  } catch (err: any) {
    localError.value = err.message || 'خطا در ثبت پرسش';
  } finally {
    isSubmitting.value = false;
    uploadingImages.value = false;
  }
}
</script>

<style scoped>
.post-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(11, 19, 41, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.post-modal-card {
  position: relative;
  width: 100%;
  max-width: 620px;
  background: #ffffff;
  border-radius: 1.25rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2.25rem;
  color: #1e293b;
  max-height: 90vh;
  overflow-y: auto;
}

:global(html.dark) .post-modal-card {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(6, 182, 212, 0.15);
}

.post-modal-close {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(148, 163, 184, 0.15);
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.post-modal-close:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.post-modal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.header-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 0.85rem;
  background: rgba(6, 182, 212, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.post-modal-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

:global(html.dark) .post-modal-title {
  color: #ffffff;
}

.post-modal-subtitle {
  font-size: 0.825rem;
  color: #64748b;
  margin-top: 0.25rem;
}

:global(html.dark) .post-modal-subtitle {
  color: #94a3b8;
}

/* Quota Box */
.quota-box {
  background: rgba(6, 182, 212, 0.08);
  border: 1px solid rgba(6, 182, 212, 0.22);
  border-radius: 0.85rem;
  padding: 0.85rem 1rem;
  margin-bottom: 1.25rem;
}

.quota-box--full {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.25);
}

.quota-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.82rem;
  margin-bottom: 0.45rem;
}

.quota-title {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 700;
  color: #0f172a;
}

:global(html.dark) .quota-title {
  color: #f1f5f9;
}

.quota-badge {
  font-size: 0.775rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
}

.quota-badge--ok {
  background: rgba(6, 182, 212, 0.18);
  color: #0284c7;
}

:global(html.dark) .quota-badge--ok {
  color: #38bdf8;
}

.quota-badge--danger {
  background: rgba(239, 68, 68, 0.18);
  color: #ef4444;
}

.quota-bar-track {
  width: 100%;
  height: 6px;
  background: rgba(148, 163, 184, 0.2);
  border-radius: 9999px;
  overflow: hidden;
}

.quota-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #06b6d4, #0284c7);
  transition: width 0.3s ease;
  border-radius: 9999px;
}

.quota-bar-fill--danger {
  background: linear-gradient(90deg, #f97316, #ef4444);
}

.quota-warning-text {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ef4444;
}

.modal-error-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

:global(html.dark) .form-label {
  color: #cbd5e1;
}

.inline-icon {
  margin-left: 0.25rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  background: #f8fafc;
  color: #0f172a;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease;
}

:global(html.dark) .form-input,
:global(html.dark) .form-textarea {
  background: #1e293b;
  border-color: #334155;
  color: #f8fafc;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #0ea5e9;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

:global(html.dark) .form-input:focus,
:global(html.dark) .form-textarea:focus {
  background: #0f172a;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
}

.char-counter {
  font-size: 0.75rem;
  color: #94a3b8;
  text-align: left;
}

/* Image Upload Area */
.images-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.images-counter {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

:global(html.dark) .images-counter {
  color: #94a3b8;
}

.hidden-file-input {
  display: none;
}

.dropzone-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem;
  border: 2px dashed rgba(6, 182, 212, 0.4);
  border-radius: 0.85rem;
  background: rgba(6, 182, 212, 0.04);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.dropzone-box:hover,
.dropzone-box--dragging {
  border-color: #06b6d4;
  background: rgba(6, 182, 212, 0.09);
  transform: translateY(-1px);
}

.dropzone-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.825rem;
  color: #334155;
  font-weight: 600;
}

:global(html.dark) .dropzone-text {
  color: #cbd5e1;
}

.dropzone-hint {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 400;
}

/* Previews Grid */
.previews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.preview-card {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0.4rem;
}

.preview-size {
  font-size: 0.7rem;
  color: #ffffff;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.remove-img-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(239, 68, 68, 0.9);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-img-btn:hover {
  background: #ef4444;
  transform: scale(1.1);
}

.consultation-tip {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  background: rgba(14, 165, 233, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.2);
  color: #0284c7;
  font-size: 0.825rem;
  line-height: 1.5;
}

:global(html.dark) .consultation-tip {
  background: rgba(14, 165, 233, 0.12);
  color: #38bdf8;
}

.tip-icon {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.modal-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.cancel-btn {
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid #cbd5e1;
  background: transparent;
  color: #64748b;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

:global(html.dark) .cancel-btn {
  border-color: #334155;
  color: #94a3b8;
}

.cancel-btn:hover {
  background: rgba(148, 163, 184, 0.1);
  color: #334155;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  background: linear-gradient(135deg, #0284c7, #06b6d4);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(6, 182, 212, 0.3);
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(6, 182, 212, 0.45);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
