<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="authStore.authModalOpen"
        class="auth-modal-overlay"
        @click.self="authStore.closeAuthModal"
      >
        <div class="auth-modal-card" dir="rtl">
          <!-- Close Button -->
          <button
            class="auth-modal-close"
            @click="authStore.closeAuthModal"
            aria-label="بستن"
          >
            <X :size="20" />
          </button>

          <!-- Header / Tabs -->
          <div class="auth-modal-header">
            <div class="auth-modal-tabs">
              <button
                class="auth-tab"
                :class="{ 'auth-tab--active': authStore.authModalTab === 'login' }"
                @click="switchTab('login')"
              >
                ورود به حساب
              </button>
              <button
                class="auth-tab"
                :class="{ 'auth-tab--active': authStore.authModalTab === 'register' }"
                @click="switchTab('register')"
              >
                ثبت‌نام جدید
              </button>
            </div>
            <p class="auth-subtitle">
              {{
                authStore.authModalTab === 'login'
                  ? 'برای ارسال نظر و پرسش در تالار گفتگو وارد شوید'
                  : 'عضو جامعه تخصصی مشاوره خرید لپتاپ شوید'
              }}
            </p>
          </div>

          <!-- Error Alert -->
          <div v-if="localError || authStore.error" class="auth-error-alert">
            <AlertCircle :size="18" />
            <span>{{ localError || authStore.error }}</span>
          </div>

          <!-- LOGIN FORM -->
          <form
            v-if="authStore.authModalTab === 'login'"
            @submit.prevent="handleLogin"
            class="auth-form"
          >
            <div class="form-group">
              <label class="form-label" for="login-username">نام کاربری</label>
              <div class="input-wrapper">
                <User :size="18" class="input-icon" />
                <input
                  id="login-username"
                  v-model="loginForm.username"
                  type="text"
                  placeholder="مثال: ali_rezaei"
                  required
                  class="form-input"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="login-password">رمز عبور</label>
              <div class="input-wrapper">
                <Lock :size="18" class="input-icon" />
                <input
                  id="login-password"
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                  class="form-input"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" :size="18" />
                  <Eye v-else :size="18" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              class="auth-submit-btn"
              :disabled="authStore.loading"
            >
              <span v-if="authStore.loading" class="spinner"></span>
              <span v-else>ورود به حساب کاربری</span>
            </button>

            <div class="auth-switch-prompt">
              <span>حساب کاربری ندارید؟</span>
              <button
                type="button"
                class="switch-link"
                @click="switchTab('register')"
              >
                همین الان ثبت‌نام کنید
              </button>
            </div>
          </form>

          <!-- REGISTER FORM -->
          <form
            v-else
            @submit.prevent="handleRegister"
            class="auth-form"
          >
            <div class="form-group">
              <label class="form-label" for="reg-username">نام کاربری (انگلیسی)</label>
              <div class="input-wrapper">
                <User :size="18" class="input-icon" />
                <input
                  id="reg-username"
                  v-model="regForm.username"
                  type="text"
                  placeholder="مثال: amir_laptop"
                  required
                  minlength="3"
                  class="form-input"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="reg-first-name">نام</label>
                <div class="input-wrapper">
                  <Smile :size="18" class="input-icon" />
                  <input
                    id="reg-first-name"
                    v-model="regForm.firstName"
                    type="text"
                    placeholder="مثال: امیر"
                    required
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="reg-last-name">نام خانوادگی</label>
                <div class="input-wrapper">
                  <Smile :size="18" class="input-icon" />
                  <input
                    id="reg-last-name"
                    v-model="regForm.lastName"
                    type="text"
                    placeholder="مثال: رضایی"
                    required
                    class="form-input"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-password">رمز عبور (حداقل ۶ کاراکتر)</label>
              <div class="input-wrapper">
                <Lock :size="18" class="input-icon" />
                <input
                  id="reg-password"
                  v-model="regForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                  minlength="6"
                  class="form-input"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" :size="18" />
                  <Eye v-else :size="18" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              class="auth-submit-btn"
              :disabled="authStore.loading"
            >
              <span v-if="authStore.loading" class="spinner"></span>
              <span v-else>ایجاد حساب و ورود</span>
            </button>

            <div class="auth-switch-prompt">
              <span>قبلاً ثبت‌نام کرده‌اید؟</span>
              <button
                type="button"
                class="switch-link"
                @click="switchTab('login')"
              >
                وارد حساب کاربری شوید
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import {
  X,
  User,
  Lock,
  Smile,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-vue-next';

const authStore = useAuthStore();
const showPassword = ref(false);
const localError = ref<string | null>(null);

const loginForm = reactive({
  username: '',
  password: '',
});

const regForm = reactive({
  username: '',
  firstName: '',
  lastName: '',
  password: '',
});

function switchTab(tab: 'login' | 'register') {
  authStore.authModalTab = tab;
  localError.value = null;
  authStore.error = null;
}

async function handleLogin() {
  localError.value = null;
  if (!loginForm.username.trim() || !loginForm.password) {
    localError.value = 'لطفاً نام کاربری و رمز عبور را وارد کنید';
    return;
  }
  try {
    await authStore.login(loginForm.username.trim(), loginForm.password);
    loginForm.username = '';
    loginForm.password = '';
  } catch (err: any) {
    localError.value = err.message || 'خطا در ورود';
  }
}

async function handleRegister() {
  localError.value = null;
  if (!regForm.username.trim() || !regForm.firstName.trim() || !regForm.lastName.trim() || !regForm.password) {
    localError.value = 'لطفاً تمامی فیلدهای الزامی را پر کنید';
    return;
  }
  if (regForm.password.length < 6) {
    localError.value = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    return;
  }
  try {
    await authStore.register(
      regForm.username.trim(),
      regForm.password,
      regForm.firstName.trim(),
      regForm.lastName.trim(),
    );
    regForm.username = '';
    regForm.firstName = '';
    regForm.lastName = '';
    regForm.password = '';
  } catch (err: any) {
    localError.value = err.message || 'خطا در ثبت‌نام';
  }
}
</script>

<style scoped>
.auth-modal-overlay {
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

.auth-modal-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border-radius: 1.25rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);
  padding: 2.25rem;
  color: #1e293b;
  overflow: hidden;
  transition: all 0.3s ease;
}

:global(html.dark) .auth-modal-card {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(6, 182, 212, 0.15);
}

.auth-modal-close {
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

.auth-modal-close:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.auth-modal-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.auth-modal-tabs {
  display: flex;
  background: #f1f5f9;
  padding: 0.25rem;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
}

:global(html.dark) .auth-modal-tabs {
  background: #1e293b;
}

.auth-tab {
  flex: 1;
  padding: 0.65rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

:global(html.dark) .auth-tab {
  color: #94a3b8;
}

.auth-tab--active {
  background: #ffffff;
  color: #0284c7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

:global(html.dark) .auth-tab--active {
  background: #0ea5e9;
  color: #ffffff;
  box-shadow: 0 2px 12px rgba(14, 165, 233, 0.3);
}

.auth-subtitle {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 0.25rem;
}

:global(html.dark) .auth-subtitle {
  color: #94a3b8;
}

.auth-error-alert {
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

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-label {
  font-size: 0.825rem;
  font-weight: 600;
  color: #475569;
}

:global(html.dark) .form-label {
  color: #cbd5e1;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: 0.85rem;
  color: #94a3b8;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 0.7rem 2.6rem 0.7rem 2.4rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  background: #f8fafc;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
}

:global(html.dark) .form-input {
  background: #1e293b;
  border-color: #334155;
  color: #f8fafc;
}

.form-input:focus {
  border-color: #0ea5e9;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

:global(html.dark) .form-input:focus {
  background: #0f172a;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
}

.password-toggle {
  position: absolute;
  left: 0.85rem;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.password-toggle:hover {
  color: #475569;
}

:global(html.dark) .password-toggle:hover {
  color: #f1f5f9;
}

.auth-submit-btn {
  margin-top: 0.5rem;
  padding: 0.8rem;
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

.auth-submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(6, 182, 212, 0.45);
}

.auth-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-switch-prompt {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 0.5rem;
}

:global(html.dark) .auth-switch-prompt {
  color: #94a3b8;
}

.switch-link {
  border: none;
  background: transparent;
  color: #0284c7;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

:global(html.dark) .switch-link {
  color: #38bdf8;
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
