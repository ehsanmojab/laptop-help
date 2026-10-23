<template>
  <div class="team-page">
    <!-- Page Header -->
    <section class="page-header" id="team-header">
      <div class="page-header__bg"></div>
      <div class="container page-header__content">
        <h1 class="page-header__title">تیم ما</h1>
        <p class="page-header__subtitle">
          با تیم متخصص و با‌تجربه ما آشنا شوید. افرادی که با علاقه و دانش فنی، بهترین مشاوره خرید لپتاپ را به شما ارائه می‌دهند.
        </p>
      </div>
    </section>

    <!-- Team Members -->
    <section class="team" id="team-section">
      <div class="container">
        <div class="team__grid">
          <div
            v-for="(member, index) in members"
            :key="index"
            class="member-card animate-on-scroll"
            :id="'member-' + (index + 1)"
          >
            <div class="member-card__image-wrap">
              <img v-if="member.image" :src="member.image" :alt="member.name" class="member-card__image" />
              <div v-else class="member-card__placeholder">
                <span>{{ member.name.charAt(0) }}</span>
              </div>
              <div class="member-card__overlay">
                <div class="member-card__social">
                  <a v-if="member.linkedin" :href="member.linkedin" target="_blank" class="member-card__social-link" aria-label="لینکدین">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a v-if="member.twitter" :href="member.twitter" target="_blank" class="member-card__social-link" aria-label="توییتر">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="member-card__info">
              <h3 class="member-card__name">{{ member.name }}</h3>
              <p class="member-card__role">{{ member.role }}</p>
              <p class="member-card__bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values" id="values-section">
      <div class="container">
        <h2 class="section-title animate-on-scroll">ارزش‌های ما</h2>
        <p class="section-subtitle animate-on-scroll">اصولی که ما بر اساس آن‌ها کار می‌کنیم</p>
        <div class="values__grid">
          <div v-for="(value, i) in values" :key="i" class="value-card animate-on-scroll">
            <div class="value-card__icon" :style="{ background: value.bg }">{{ value.icon }}</div>
            <h3 class="value-card__title">{{ value.title }}</h3>
            <p class="value-card__desc">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import employee1 from '../assets/images/employee1.jpg'
import employee2 from '../assets/images/employee2.jpg'
import { useScrollAnimation } from '../composables/useScrollAnimation'

useScrollAnimation()

const members = [
  {
    name: 'علی احمدی',
    role: 'مدیر و مشاور ارشد',
    bio: 'با بیش از ۷ سال تجربه در حوزه فناوری و مشاوره خرید لپتاپ، علی بنیان‌گذار و مدیر مجموعه مشاوره خرید لپتاپ است.',
    image: employee1,
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'محمد رضایی',
    role: 'کارشناس فنی و تست',
    bio: 'متخصص سخت‌افزار و تست سلامت لپتاپ‌های استوک. محمد با دقت بالا، تمام قطعات لپتاپ را بررسی و ارزیابی می‌کند.',
    image: employee2,
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'سارا محمدی',
    role: 'مشاور خرید و پشتیبانی',
    bio: 'سارا با تجربه گسترده در ارتباط با مشتریان، بهترین پیشنهادات را ارائه و تا انتهای فرآیند خرید همراه شما است.',
    image: null,
    linkedin: '#',
    twitter: '#'
  }
]

const values = [
  {
    icon: '🎯',
    title: 'صداقت و شفافیت',
    description: 'ما همیشه صادقانه بهترین پیشنهادات را ارائه می‌دهیم و هیچ هزینه پنهانی ندارد.',
    bg: 'linear-gradient(135deg, hsl(195, 70%, 92%), hsl(195, 65%, 85%))'
  },
  {
    icon: '💡',
    title: 'دانش به‌روز',
    description: 'تیم ما همیشه با آخرین تکنولوژی‌ها و مدل‌های لپتاپ به‌روز است.',
    bg: 'linear-gradient(135deg, hsl(38, 80%, 92%), hsl(38, 75%, 85%))'
  },
  {
    icon: '❤️',
    title: 'رضایت مشتری',
    description: 'هدف اصلی ما رضایت کامل شما از خرید لپتاپ و خدمات مشاوره‌ای ماست.',
    bg: 'linear-gradient(135deg, hsl(0, 60%, 92%), hsl(0, 55%, 86%))'
  }
]
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
    radial-gradient(circle at 30% 40%, hsla(170, 60%, 50%, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, hsla(195, 65%, 55%, 0.1) 0%, transparent 50%);
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
   Team Grid
   ============================================ */
.team {
  padding: var(--space-24) 0;
}

.team__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

/* Member Card */
.member-card {
  border-radius: var(--radius-2xl);
  background: var(--surface-card);
  border: 1px solid var(--color-neutral-100);
  overflow: hidden;
  transition: all var(--transition-base);
}

.member-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-2xl);
  border-color: var(--color-primary-200);
}

.member-card__image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.member-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.member-card:hover .member-card__image {
  transform: scale(1.05);
}

/* Placeholder for missing images */
.member-card__image-wrap:has(> :not(img)),
.member-card__image[src=""] {
  display: none;
}

.member-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, hsla(195, 70%, 10%, 0.7) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: var(--space-5);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.member-card:hover .member-card__overlay {
  opacity: 1;
}

.member-card__social {
  display: flex;
  gap: var(--space-3);
}

.member-card__social-link {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  background: hsla(0, 0%, 100%, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all var(--transition-fast);
}

.member-card__social-link:hover {
  background: hsla(0, 0%, 100%, 0.35);
  transform: translateY(-2px);
}

.member-card__info {
  padding: var(--space-6);
}

.member-card__name {
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-1);
}

.member-card__role {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-primary-500);
  margin-bottom: var(--space-3);
}

.member-card__bio {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
  line-height: 1.8;
}

/* Placeholder avatar for members without image */
.member-card__image-wrap:empty::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary-200), var(--color-accent-400));
}

.member-card__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary-300), var(--color-accent-500));
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-card__placeholder span {
  font-size: 5rem;
  font-weight: 900;
  color: hsla(0, 0%, 100%, 0.6);
}

/* ============================================
   Values Section
   ============================================ */
.values {
  padding: var(--space-20) 0;
  background: linear-gradient(180deg, var(--color-primary-50) 0%, transparent 100%);
}

.values__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.value-card {
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--surface-card);
  border: 1px solid var(--color-neutral-100);
  text-align: center;
  transition: all var(--transition-base);
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-200);
}

.value-card__icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin: 0 auto var(--space-5);
}

.value-card__title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-3);
}

.value-card__desc {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
  line-height: 1.8;
}

/* ============================================
   Responsive
   ============================================ */
@media (max-width: 1024px) {
  .team__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .team__grid,
  .values__grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-inline: auto;
  }
}
</style>
