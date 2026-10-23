<template>
  <div class="contact-page">
    <!-- Page Header -->
    <section class="page-header" id="contact-header">
      <div class="page-header__bg"></div>
      <div class="container page-header__content">
        <h1 class="page-header__title">تماس با ما</h1>
        <p class="page-header__subtitle">
          برای دریافت راهنمایی و مشاوره تخصصی خرید لپتاپ، از طریق پیام‌رسان‌های ایرانی، تلگرام یا تماس تلفنی مستقیم با ما در ارتباط باشید.
        </p>
      </div>
    </section>

    <!-- Channels Section -->
    <section class="channels-section" id="channels-section">
      <div class="container">
        <div class="channels-grid">
          <!-- Direct Call Card -->
          <div class="channel-card channel-card--call scroll-driven-item" id="channel-call">
            <div class="channel-card__top-bar"></div>
            <div class="channel-card__header">
              <div class="channel-card__icon channel-card__icon--call">
                <Phone :size="26" class="text-emerald-400" />
              </div>
            </div>
            <h3 class="channel-card__title">تماس تلفنی مستقیم</h3>
            <p class="channel-card__desc">گفتگوی مستقیم با مشاور ارشد خرید لپتاپ و پاسخگویی آنی به تمام سوالات فنی</p>
            <div class="channel-card__contact-box">
              <span class="channel-card__val ltr-text">۰۹۱۲-۳۴۵-۶۷۸۹</span>
              <button 
                class="copy-btn" 
                @click="handleCopy('09123456789', 'شماره تماس')" 
                title="کپی شماره"
                aria-label="کپی شماره تماس"
              >
                <Check v-if="copied && activeLabel === 'شماره تماس'" :size="16" class="text-emerald-500" />
                <Copy v-else :size="16" />
              </button>
            </div>
            <a href="tel:09123456789" class="channel-card__btn channel-card__btn--call" id="btn-call">
              <span>برقراری تماس</span>
              <ArrowLeft :size="18" />
            </a>
          </div>

          <!-- Telegram Card -->
          <div class="channel-card channel-card--telegram scroll-driven-item" id="channel-telegram">
            <div class="channel-card__top-bar"></div>
            <div class="channel-card__header">
              <div class="channel-card__icon channel-card__icon--telegram">
                <Send :size="26" class="text-sky-400" />
              </div>
            </div>
            <h3 class="channel-card__title">تلگرام (Telegram)</h3>
            <p class="channel-card__desc">ارسال مشخصات، عکس لپتاپ، استعلام قیمت و دریافت سریع لیست مدل‌های پیشنهادی</p>
            <div class="channel-card__contact-box">
              <span class="channel-card__val ltr-text">@laptop_moshavere</span>
              <button 
                class="copy-btn" 
                @click="handleCopy('@laptop_moshavere', 'آیدی تلگرام')" 
                title="کپی آیدی"
                aria-label="کپی آیدی تلگرام"
              >
                <Check v-if="copied && activeLabel === 'آیدی تلگرام'" :size="16" class="text-emerald-500" />
                <Copy v-else :size="16" />
              </button>
            </div>
            <a href="https://t.me/laptop_moshavere" target="_blank" rel="noopener noreferrer" class="channel-card__btn channel-card__btn--telegram" id="btn-telegram">
              <span>ارسال پیام در تلگرام</span>
              <ArrowLeft :size="18" />
            </a>
          </div>

          <!-- Bale Card -->
          <div class="channel-card channel-card--bale scroll-driven-item" id="channel-bale">
            <div class="channel-card__top-bar"></div>
            <div class="channel-card__header">
              <div class="channel-card__icon channel-card__icon--bale">
                <MessageSquare :size="26" class="text-teal-400" />
              </div>
            </div>
            <h3 class="channel-card__title">پیام‌رسان بله (Bale)</h3>
            <p class="channel-card__desc">ارتباط در بستر پیام‌رسان بله با سرعت بالا، بدون نیاز به فیلترشکن</p>
            <div class="channel-card__contact-box">
              <span class="channel-card__val ltr-text">ble.ir/laptop_moshavere</span>
              <button 
                class="copy-btn" 
                @click="handleCopy('laptop_moshavere', 'کانال بله')" 
                title="کپی لینک"
                aria-label="کپی لینک بله"
              >
                <Check v-if="copied && activeLabel === 'کانال بله'" :size="16" class="text-emerald-500" />
                <Copy v-else :size="16" />
              </button>
            </div>
            <a href="https://ble.ir/laptop_moshavere" target="_blank" rel="noopener noreferrer" class="channel-card__btn channel-card__btn--bale" id="btn-bale">
              <span>ارسال پیام در بله</span>
              <ArrowLeft :size="18" />
            </a>
          </div>

          <!-- Rubika Card -->
          <div class="channel-card channel-card--rubika scroll-driven-item" id="channel-rubika">
            <div class="channel-card__top-bar"></div>
            <div class="channel-card__header">
              <div class="channel-card__icon channel-card__icon--rubika">
                <Sparkles :size="26" class="text-purple-400" />
              </div>
            </div>
            <h3 class="channel-card__title">روبیکا (Rubika)</h3>
            <p class="channel-card__desc">ارتباط مستقیم و ارسال آسان پیام در روبیکا با تعرفه اینترنت نیم‌بها</p>
            <div class="channel-card__contact-box">
              <span class="channel-card__val ltr-text">rubika.ir/laptop_moshavere</span>
              <button 
                class="copy-btn" 
                @click="handleCopy('laptop_moshavere', 'آیدی روبیکا')" 
                title="کپی لینک"
                aria-label="کپی آیدی روبیکا"
              >
                <Check v-if="copied && activeLabel === 'آیدی روبیکا'" :size="16" class="text-emerald-500" />
                <Copy v-else :size="16" />
              </button>
            </div>
            <a href="https://rubika.ir/laptop_moshavere" target="_blank" rel="noopener noreferrer" class="channel-card__btn channel-card__btn--rubika" id="btn-rubika">
              <span>ارسال پیام در روبیکا</span>
              <ArrowLeft :size="18" />
            </a>
          </div>
        </div>

        <!-- Info & FAQ Helper Box -->
        <div class="helper-box scroll-driven-item" id="contact-helper">
          <div class="helper-box__content">
            <div class="helper-box__badge">راهنمای مشاوره</div>
            <h2 class="helper-box__title">قبل از تماس چه مواردی را آماده داشته باشیم؟</h2>
            <div class="helper-box__grid">
              <div class="helper-item">
                <div class="helper-item__num">۱</div>
                <div>
                  <h4>رشته و زمینه کاری</h4>
                  <p>رشته تحصیلی دانشگاهی یا حرفه‌ای که برای آن قصد تهیه لپتاپ دارید.</p>
                </div>
              </div>
              <div class="helper-item">
                <div class="helper-item__num">۲</div>
                <div>
                  <h4>نرم‌افزارهای مورد نیاز</h4>
                  <p>برنامه‌هایی مانند SolidWorks, MATLAB, نرم‌افزارهای گرافیکی یا کدنویسی.</p>
                </div>
              </div>
              <div class="helper-item">
                <div class="helper-item__num">۳</div>
                <div>
                  <h4>حدود بودجه مالی</h4>
                  <p>سقف هزینه‌ای که برای خرید نو یا استوک در نظر گرفته‌اید.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="helper-box__hours">
            <div class="hours-badge">
              <span class="hours-dot"></span>
              پاسخگویی فعال
            </div>
            <h3>ساعات پاسخگویی</h3>
            <div class="hours-time">۲۴/۷</div>
            <p>همه روزه، شبانه‌روزی</p>
            <p class="hours-note">پیام‌ها در پیام‌رسان‌ها ظرف کمتر از ۳۰ دقیقه پاسخ داده می‌شوند.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="copied" class="toast-popup">
        <CheckCircle2 :size="18" class="text-emerald-400 inline-block me-1.5" />
        <span>{{ activeLabel }} با موفقیت کپی شد!</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { 
  Phone, 
  Send, 
  MessageSquare, 
  Copy, 
  Check, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles 
} from 'lucide-vue-next'

const { copy, copied } = useClipboard({ copiedDuring: 2500 })
const activeLabel = ref('')

function handleCopy(text: string, label: string) {
  activeLabel.value = label
  copy(text)
}
</script>

<style scoped>
/* ============================================
   Page Header (Dark Gradient - Matching Other Pages)
   ============================================ */
.page-header {
  position: relative;
  padding: calc(var(--nav-height) + var(--space-16)) 0 var(--space-16);
  overflow: hidden;
}

.page-header__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-primary-600) 50%, var(--color-accent-600) 100%);
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
  text-align: center;
}

.page-header__title {
  font-size: var(--font-size-4xl);
  font-weight: 900;
  color: white;
  margin-bottom: var(--space-4);
}

.page-header__subtitle {
  font-size: var(--font-size-lg);
  color: hsla(195, 30%, 85%, 0.9);
  max-width: 650px;
  margin-inline: auto;
  line-height: 1.9;
}

/* ============================================
   Channels Section
   ============================================ */
.channels-section {
  padding: var(--space-12) 0 var(--space-20);
}

.channels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-14);
}

.channel-card {
  position: relative;
  border-radius: var(--radius-2xl);
  background: white;
  border: 1px solid var(--color-neutral-200);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  box-shadow: 0 4px 12px hsla(210, 20%, 10%, 0.05);
  overflow: hidden;
}

.channel-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px hsla(210, 20%, 10%, 0.1);
}

.channel-card__top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

/* Brand Colors */
.channel-card--call .channel-card__top-bar { background: linear-gradient(90deg, #0284c7, #0d9488); }
.channel-card--call:hover { border-color: #0284c7; }

.channel-card--telegram .channel-card__top-bar { background: linear-gradient(90deg, #229ed9, #0088cc); }
.channel-card--telegram:hover { border-color: #229ed9; }

.channel-card--bale .channel-card__top-bar { background: linear-gradient(90deg, #10b981, #059669); }
.channel-card--bale:hover { border-color: #10b981; }

.channel-card--rubika .channel-card__top-bar { background: linear-gradient(90deg, #8b5cf6, #ec4899); }
.channel-card--rubika:hover { border-color: #ec4899; }

.channel-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-5);
}

.channel-card__icon {
  width: 54px;
  height: 54px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 14px hsla(0, 0%, 0%, 0.12);
}

.channel-card__icon--call { background: linear-gradient(135deg, #0284c7, #0f766e); }
.channel-card__icon--telegram { background: linear-gradient(135deg, #2aabee, #229ed9); }
.channel-card__icon--bale { background: linear-gradient(135deg, #10b981, #047857); }
.channel-card__icon--rubika { background: linear-gradient(135deg, #7c3aed, #db2777); }


.channel-card__title {
  font-size: var(--font-size-xl);
  font-weight: 800;
  margin-bottom: var(--space-2);
  color: var(--color-neutral-900);
}

.channel-card__desc {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-600);
  line-height: 1.8;
  margin-bottom: var(--space-5);
  flex-grow: 1;
}

.channel-card__contact-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-3);
  background: var(--color-neutral-50);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-5);
  border: 1px solid var(--color-neutral-200);
}

.channel-card__val {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-neutral-800);
}

.ltr-text {
  direction: ltr;
  text-align: left;
}

.copy-btn {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  color: var(--color-neutral-500);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
}

.copy-btn:hover {
  background: var(--color-neutral-200);
  color: var(--color-neutral-900);
}

.channel-card__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-full);
  color: white;
  font-weight: 700;
  font-size: var(--font-size-sm);
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px hsla(0, 0%, 0%, 0.12);
}

.channel-card__btn--call { background: linear-gradient(135deg, #0284c7, #0d9488); }
.channel-card__btn--call:hover { box-shadow: 0 6px 18px hsla(195, 80%, 40%, 0.3); transform: translateY(-2px); }

.channel-card__btn--telegram { background: linear-gradient(135deg, #229ed9, #0088cc); }
.channel-card__btn--telegram:hover { box-shadow: 0 6px 18px hsla(200, 80%, 45%, 0.3); transform: translateY(-2px); }

.channel-card__btn--bale { background: linear-gradient(135deg, #10b981, #059669); }
.channel-card__btn--bale:hover { box-shadow: 0 6px 18px hsla(150, 70%, 35%, 0.3); transform: translateY(-2px); }

.channel-card__btn--rubika { background: linear-gradient(135deg, #8b5cf6, #ec4899); }
.channel-card__btn--rubika:hover { box-shadow: 0 6px 18px hsla(300, 70%, 45%, 0.3); transform: translateY(-2px); }

/* ============================================
   Helper & Hours Box (Light Harmonious Theme)
   ============================================ */
.helper-box {
  background: linear-gradient(135deg, hsl(195, 60%, 96%) 0%, hsl(180, 50%, 94%) 100%);
  border-radius: var(--radius-2xl);
  padding: var(--space-10);
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-10);
  border: 1px solid var(--color-primary-200);
  box-shadow: 0 8px 24px hsla(195, 65%, 42%, 0.08);
}

.helper-box__badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: hsla(195, 70%, 45%, 0.12);
  color: var(--color-primary-700);
  font-size: var(--font-size-xs);
  font-weight: 800;
  margin-bottom: var(--space-3);
}

.helper-box__title {
  font-size: var(--font-size-2xl);
  font-weight: 900;
  margin-bottom: var(--space-6);
  color: var(--color-neutral-900);
}

.helper-box__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-5);
}

.helper-item {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
}

.helper-item__num {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: var(--font-size-sm);
  flex-shrink: 0;
  box-shadow: 0 2px 6px hsla(195, 65%, 42%, 0.25);
}

.helper-item h4 {
  font-size: var(--font-size-base);
  font-weight: 800;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-1);
}

.helper-item p {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-600);
  line-height: 1.7;
}

/* Hours sidebar inside helper box */
.helper-box__hours {
  background: white;
  border: 1px solid var(--color-primary-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px hsla(195, 65%, 42%, 0.06);
}

.hours-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: #dcfce7;
  color: #15803d;
  font-size: var(--font-size-xs);
  font-weight: 700;
  margin-bottom: var(--space-3);
}

.hours-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: #16a34a;
  box-shadow: 0 0 6px #16a34a;
}

.helper-box__hours h3 {
  font-size: var(--font-size-lg);
  font-weight: 800;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-1);
}

.helper-box__hours p {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-500);
}

.hours-time {
  font-size: var(--font-size-2xl);
  font-weight: 900;
  color: var(--color-primary-600);
  margin: var(--space-2) 0;
  direction: ltr;
}

.hours-note {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-500);
  line-height: 1.6;
}

/* Toast */
.toast-popup {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-neutral-900);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-primary-400);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.toast-popup svg {
  color: var(--color-primary-400);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

/* Responsive */
@media (max-width: 860px) {
  .helper-box {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    padding: var(--space-6);
  }
}
</style>
