<template>
  <div class="services-page">
    <!-- Page Header -->
    <section class="page-header" id="services-header">
      <div class="page-header__bg"></div>
      <div class="container page-header__content">
        <h1 class="page-header__title">خدمات ما</h1>
        <p class="page-header__subtitle">
          فرآیند مشاوره ما در ۴ مرحله ساده و مشخص انجام می‌شود تا شما با اطمینان کامل، بهترین لپتاپ را انتخاب کنید.
        </p>
      </div>
    </section>

    <!-- Phases Section -->
    <section class="phases" id="phases-section">
      <div
        v-for="(phase, index) in phases"
        :key="index"
        class="phase"
        :style="{ background: phase.bg }"
        :id="'phase-' + (index + 1)"
      >
        <div class="container phase__inner">
          <div class="phase__number-wrap">
            <div class="phase__number" :style="{ background: phase.numberBg, color: phase.numberColor }">
              {{ toPersianNum(index + 1) }}
            </div>
            <div class="phase__line" v-if="index < phases.length - 1" :style="{ background: phase.lineColor }"></div>
          </div>
          <div class="phase__content">
            <div class="phase__badge" :style="{ background: phase.badgeBg, color: phase.badgeColor }">
              مرحله {{ toPersianNum(index + 1) }}
            </div>
            <h2 class="phase__title" :style="{ color: phase.titleColor }">{{ phase.title }}</h2>
            <p class="phase__desc" :style="{ color: phase.descColor }">{{ phase.description }}</p>
            <ul class="phase__features">
              <li v-for="(feature, fi) in phase.features" :key="fi" :style="{ color: phase.featureColor }">
                <span class="phase__check" :style="{ background: phase.checkBg, color: phase.checkColor }">✓</span>
                {{ feature }}
              </li>
            </ul>
          </div>
          <div class="phase__visual-wrap">
            <div class="phase__image-card">
              <img :src="phase.image" :alt="phase.title" class="phase__image" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="services-contact" id="services-contact-section">
      <div class="container">
        <div class="services-contact__card scroll-driven-item">
          <div class="services-contact__bg"></div>
          <div class="services-contact__content">
            <span class="services-contact__badge">مشاوره تخصصی و همراهی کامل</span>
            <h2 class="services-contact__title">نیاز به راهنمایی بیشتر دارید؟ تماس با ما</h2>
            <p class="services-contact__desc">
              اگر در انتخاب بین مدل‌ها تردید دارید یا به بررسی سلامت لپتاپ استوک نیاز دارید، مشاوران ما از طریق تماس تلفنی، پیام‌رسان‌ها و تالار گفتگو همراه شما هستند.
            </p>
            <div class="services-contact__actions">
              <router-link to="/contact" class="services-contact__btn services-contact__btn--primary" id="btn-services-contact">
                <span>تماس با ما</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </router-link>
              <a href="tel:09333729280" class="services-contact__btn services-contact__btn--call" id="btn-services-call">
                <span>تماس تلفنی سریع</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </a>
              <router-link to="/forum" class="services-contact__btn services-contact__btn--forum" id="btn-services-forum">
                <span>پرسش در تالار گفتگو</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import phase1Img from '../assets/images/phase1.jpg'
import phase2Img from '../assets/images/phase2.jpg'
import phase3Img from '../assets/images/phase3-task-manager.svg'
import phase4Img from '../assets/images/phase4.jpg'

const phases = [
  {
    title: 'تعیین رشته و نیاز موردنظر',
    description: 'در اولین قدم، ما با شما گفتگو می‌کنیم تا رشته تحصیلی یا حوزه کاری، نرم‌افزارهای مورد استفاده، و نیازهای دقیق شما را بشناسیم. این مرحله پایه و اساس یک خرید هوشمندانه است.',
    image: phase1Img,
    features: [
      'بررسی رشته تحصیلی و حوزه کاری',
      'شناسایی نرم‌افزارهای مورد نیاز',
      'تعیین بودجه و اولویت‌های شما'
    ],
    // Light teal
    bg: 'linear-gradient(135deg, hsl(195, 60%, 96%), hsl(180, 50%, 94%))',
    numberBg: 'linear-gradient(135deg, hsl(195, 65%, 50%), hsl(170, 55%, 48%))',
    numberColor: 'white',
    lineColor: 'hsl(195, 40%, 85%)',
    badgeBg: 'hsla(195, 65%, 50%, 0.1)',
    badgeColor: 'hsl(195, 65%, 42%)',
    titleColor: 'hsl(195, 70%, 20%)',
    descColor: 'hsl(195, 30%, 40%)',
    featureColor: 'hsl(195, 25%, 35%)',
    checkBg: 'hsla(195, 65%, 50%, 0.12)',
    checkColor: 'hsl(195, 65%, 42%)'
  },
  {
    title: 'انتخاب لپتاپ استوک و یا لپتاپ نو',
    description: 'بر اساس نیاز و بودجه شما، بهترین گزینه‌ها چه نو و چه استوک را بررسی و مزایا و معایب هرکدام را توضیح می‌دهیم. هدف ما بهینه‌ترین خرید برای شماست.',
    image: phase2Img,
    features: [
      'مقایسه مزایا و معایب نو و استوک',
      'بررسی بودجه و ارزش خرید',
      'پیشنهاد بهترین برندها و فروشگاه‌ها'
    ],
    // Medium teal
    bg: 'linear-gradient(135deg, hsl(195, 55%, 90%), hsl(185, 50%, 87%))',
    numberBg: 'linear-gradient(135deg, hsl(195, 60%, 44%), hsl(175, 55%, 42%))',
    numberColor: 'white',
    lineColor: 'hsl(195, 35%, 78%)',
    badgeBg: 'hsla(195, 60%, 44%, 0.1)',
    badgeColor: 'hsl(195, 60%, 38%)',
    titleColor: 'hsl(195, 65%, 18%)',
    descColor: 'hsl(195, 25%, 38%)',
    featureColor: 'hsl(195, 20%, 33%)',
    checkBg: 'hsla(195, 60%, 44%, 0.12)',
    checkColor: 'hsl(195, 60%, 38%)'
  },
  {
    title: 'تعیین نهایی لپتاپ و مدل و مشخصات آن',
    description: 'پس از بررسی گزینه‌های مختلف، مدل نهایی لپتاپ را با تمام مشخصات فنی (پردازنده، رم، حافظه، گرافیک و...) مشخص می‌کنیم و دلایل انتخاب را کاملاً توضیح می‌دهیم.',
    image: phase3Img,
    features: [
      'تعیین دقیق مشخصات فنی مورد نیاز',
      'مقایسه مدل‌های مشابه',
      'ارائه گزارش کامل با دلایل انتخاب'
    ],
    // Deep teal
    bg: 'linear-gradient(135deg, hsl(195, 50%, 82%), hsl(190, 48%, 78%))',
    numberBg: 'linear-gradient(135deg, hsl(195, 58%, 38%), hsl(180, 52%, 36%))',
    numberColor: 'white',
    lineColor: 'hsl(195, 30%, 70%)',
    badgeBg: 'hsla(195, 55%, 38%, 0.12)',
    badgeColor: 'hsl(195, 55%, 32%)',
    titleColor: 'hsl(195, 60%, 15%)',
    descColor: 'hsl(195, 22%, 35%)',
    featureColor: 'hsl(195, 18%, 30%)',
    checkBg: 'hsla(195, 55%, 38%, 0.14)',
    checkColor: 'hsl(195, 55%, 32%)'
  },
  {
    title: 'همراهی مشتری تا انتهای خرید و انجام تست سلامت لپتاپ (استوک)',
    description: 'در آخرین مرحله، ما همراه شما هستیم. از یافتن فروشنده معتبر تا لحظه خرید و برای لپتاپ‌های استوک، تست سلامت کامل شامل بررسی هارد، باتری، صفحه نمایش و سایر قطعات انجام می‌دهیم.',
    image: phase4Img,
    features: [
      'همراهی در فرآیند خرید',
      'تست سلامت کامل لپتاپ استوک',
      'پشتیبانی پس از خرید'
    ],
    // Dark teal
    bg: 'linear-gradient(135deg, hsl(195, 48%, 72%), hsl(190, 45%, 68%))',
    numberBg: 'linear-gradient(135deg, hsl(195, 55%, 30%), hsl(185, 50%, 28%))',
    numberColor: 'white',
    lineColor: 'transparent',
    badgeBg: 'hsla(0, 0%, 100%, 0.2)',
    badgeColor: 'hsl(195, 50%, 20%)',
    titleColor: 'hsl(195, 60%, 12%)',
    descColor: 'hsl(195, 20%, 28%)',
    featureColor: 'hsl(195, 15%, 25%)',
    checkBg: 'hsla(0, 0%, 100%, 0.25)',
    checkColor: 'hsl(195, 50%, 22%)'
  }
]



function toPersianNum(num) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  return String(num).replace(/\d/g, d => persianDigits[d])
}
</script>

<style scoped>
/* ============================================
   Page Header
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
  max-width: 600px;
  margin-inline: auto;
  line-height: 1.9;
}

/* ============================================
   Phases
   ============================================ */
.phase {
  width: 100%;
  padding: var(--space-16) 0;
}

.phase__inner {
  display: grid;
  grid-template-columns: auto 1fr 340px;
  gap: var(--space-8);
  align-items: center;
}

/* Number column */
.phase__number-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.phase__number {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: 900;
  box-shadow: 0 4px 15px hsla(195, 65%, 42%, 0.25);
  flex-shrink: 0;
}

.phase__line {
  width: 3px;
  flex: 1;
  min-height: 80px;
  border-radius: 2px;
  margin-top: var(--space-4);
}

/* Content column */
.phase__badge {
  display: inline-block;
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  margin-bottom: var(--space-4);
}

.phase__title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  margin-bottom: var(--space-4);
  line-height: 1.5;
}

.phase__desc {
  font-size: var(--font-size-base);
  line-height: 1.9;
  margin-bottom: var(--space-6);
  max-width: 560px;
}

.phase__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.phase__features li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.phase__check {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  flex-shrink: 0;
  font-weight: 700;
}

/* Visual / Image column */
.phase__visual-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.phase__image-card {
  width: 100%;
  max-width: 340px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 10px 30px hsla(195, 65%, 15%, 0.15);
  border: 1px solid hsla(195, 65%, 45%, 0.2);
  background: hsla(0, 0%, 100%, 0.4);
  backdrop-filter: blur(8px);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.phase__image-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 40px hsla(195, 65%, 15%, 0.25);
}

.phase__image {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}



/* ============================================
   Responsive
   ============================================ */
@media (max-width: 960px) {
  .phase__inner {
    grid-template-columns: auto 1fr;
    gap: var(--space-6);
  }

  .phase__visual-wrap {
    grid-column: 2;
    margin-top: var(--space-4);
  }

  .phase__image-card {
    max-width: 480px;
  }
}

@media (max-width: 600px) {
  .phase__inner {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .phase__number-wrap {
    flex-direction: row;
    gap: var(--space-4);
  }

  .phase__line {
    display: none;
  }

  .phase__visual-wrap {
    grid-column: 1;
    margin-top: var(--space-4);
  }

  .phase__image-card {
    max-width: 100%;
  }

  .phase__title {
    font-size: var(--font-size-xl);
  }
}

/* ============================================
   Contact CTA Section at End of Services
   ============================================ */
.services-contact {
  padding: var(--space-16) 0 var(--space-20);
  background: linear-gradient(180deg, hsl(190, 45%, 68%) 0%, hsl(195, 48%, 62%) 100%);
  position: relative;
  overflow: hidden;
}

.services-contact__card {
  position: relative;
  border-radius: var(--radius-2xl);
  padding: var(--space-12) var(--space-8);
  background: hsla(0, 0%, 100%, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid hsla(0, 0%, 100%, 0.85);
  box-shadow: 0 20px 45px hsla(195, 65%, 20%, 0.15), inset 0 1px 0 hsla(0, 0%, 100%, 0.9);
  text-align: center;
  overflow: hidden;
}

.services-contact__bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, hsla(195, 75%, 92%, 0.6), transparent 70%);
  pointer-events: none;
}

.services-contact__content {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
}

.services-contact__badge {
  display: inline-block;
  padding: 6px 16px;
  background: hsla(195, 65%, 45%, 0.12);
  border: 1px solid hsla(195, 65%, 45%, 0.25);
  border-radius: var(--radius-full);
  color: hsl(195, 75%, 25%);
  font-size: var(--font-size-sm);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.services-contact__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: hsl(195, 75%, 15%);
  line-height: 1.35;
  margin-bottom: var(--space-4);
}

.services-contact__desc {
  font-size: var(--font-size-base);
  color: hsl(195, 25%, 32%);
  line-height: 1.8;
  margin-bottom: var(--space-8);
}

.services-contact__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.services-contact__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
  text-decoration: none;
}

.services-contact__btn--primary {
  background: linear-gradient(135deg, hsl(195, 75%, 36%), hsl(175, 70%, 32%));
  color: #ffffff;
  box-shadow: 0 4px 16px hsla(195, 75%, 30%, 0.3);
}

.services-contact__btn--primary:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, hsl(195, 75%, 30%), hsl(175, 70%, 28%));
  box-shadow: 0 8px 24px hsla(195, 75%, 25%, 0.4);
}

.services-contact__btn--call {
  background: hsla(150, 60%, 40%, 0.12);
  color: hsl(150, 70%, 25%);
  border: 1px solid hsla(150, 60%, 40%, 0.35);
}

.services-contact__btn--call:hover {
  background: hsla(150, 60%, 40%, 0.22);
  transform: translateY(-2px);
  color: hsl(150, 75%, 18%);
}

.services-contact__btn--forum {
  background: hsla(0, 0%, 100%, 0.75);
  color: hsl(195, 65%, 25%);
  border: 1px solid hsla(195, 40%, 65%, 0.45);
  box-shadow: 0 2px 8px hsla(195, 50%, 30%, 0.08);
}

.services-contact__btn--forum:hover {
  background: #ffffff;
  color: hsl(195, 80%, 18%);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px hsla(195, 50%, 30%, 0.15);
}

@media (max-width: 640px) {
  .services-contact__card {
    padding: var(--space-8) var(--space-4);
  }
  .services-contact__actions {
    flex-direction: column;
    width: 100%;
  }
  .services-contact__btn {
    width: 100%;
  }
}
</style>
