<template>
  <div class="home" ref="homeRef">
    <!-- Hero Section -->
    <section class="hero" id="hero-section">
      <div class="hero__bg">
        <img :src="heroImage" alt="مشاوره خرید لپتاپ" class="hero__bg-img" fetchpriority="high" decoding="async" />
        <div class="hero__overlay"></div>
        <div class="hero__tech-grid"></div>
        <div class="hero__tech-flare hero__tech-flare--1"></div>
        <div class="hero__tech-flare hero__tech-flare--2"></div>
        
        <!-- Ambient Cyber Floating Particles -->
        <div class="hero__particles">
          <span class="particle particle--1"></span>
          <span class="particle particle--2"></span>
          <span class="particle particle--3"></span>
          <span class="particle particle--4"></span>
        </div>
      </div>

      <div class="hero__content container">
        <div class="hero__text">
          <div class="hero__badge">
            <span class="hero__badge-dot"></span>
            <span class="hero__badge-text">مشاوره فوق‌تخصصی انتخاب لپتاپ</span>
            <div class="hero__badge-shimmer"></div>
          </div>

          <h1 class="hero__title">
            بهترین لپتاپ را با
            <span class="hero__title-accent">اطمینان کامل</span>
            انتخاب کنید
          </h1>

          <p class="hero__subtitle">
            ما لپتاپ نمی‌فروشیم؛ فقط <strong>مشاوره و راهنمایی خرید لپتاپ</strong> ارائه می‌دهیم. تیم متخصص ما با بررسی دقیق نیازها و بودجه شما، بهترین گزینه‌ها را معرفی می‌کند تا با اطمینان کامل خرید کنید.
          </p>

          <div class="hero__actions">
            <router-link to="/services" class="hero__btn hero__btn--primary" id="hero-cta-services">
              <span>مشاهده خدمات</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </router-link>
            <router-link to="/contact" class="hero__btn hero__btn--secondary" id="hero-cta-contact">
              <span>تماس با ما</span>
            </router-link>
          </div>
        </div>

        <div class="hero__visual">
          <div class="hero__visual-glow"></div>

          <div class="hero__card hero__card--float hero__card--first">
            <div class="hero__card-icon">✓</div>
            <div>
              <strong>+۵۰</strong>
              <span>مشاوره موفق</span>
            </div>
          </div>

          <div class="hero__card hero__card--float hero__card--second">
            <div class="hero__card-icon hero__card-icon--star">⭐</div>
            <div>
              <strong>رضایت ۹۸٪</strong>
              <span>مشتریان و خریداران</span>
            </div>
          </div>

          <div class="hero__card hero__card--float hero__card--third">
            <div class="hero__card-icon hero__card-icon--chip">⚡</div>
            <div>
              <strong>تست ۱۰۰٪ سلامت</strong>
              <span>سخت‌افزار، باتری و صفحه</span>
            </div>
          </div>
        </div>
      </div>

      <div class="hero__scroll-indicator">
        <div class="hero__scroll-mouse">
          <div class="hero__scroll-wheel"></div>
        </div>
        <span class="hero__scroll-text">اسکرول کنید</span>
      </div>
    </section>

    <!-- How It Works Section (فرایند مشاوره) -->
    <section class="how-preview" id="how-preview-section">
      <div class="container">
        <div class="section-header-anim">
          <h2 class="section-title">فرایند هوشمند مشاوره</h2>
          <p class="section-subtitle">
            در ۴ مرحله پیوسته، علمی و شفاف، از ارزیابی نیاز تا تست سخت‌افزاری همراه شما هستیم
          </p>
        </div>

        <!-- Process Timeline: Horizontal on Desktop, Vertical on Mobile -->
        <div class="process-timeline" id="process-timeline">
          <!-- Desktop Version: Horizontal Rows -->
          <div class="process-timeline__desktop">
            <!-- Row 1: Top details (Badge & Title) -->
            <div class="process-timeline__top-row">
              <div
                v-for="(step, i) in stepsTimeline"
                :key="'top-' + i"
                class="process-timeline__top-col"
                :id="'timeline-top-' + (i + 1)"
              >
                <span class="process-timeline__tag">مرحله {{ toPersianNum(i + 1) }}</span>
                <h3 class="process-timeline__title">{{ step.title }}</h3>
              </div>
            </div>

            <!-- Row 2: The Horizontal Line with glowing laser track -->
            <div class="process-timeline__track">
              <div class="process-timeline__line">
                <div class="process-timeline__line-fill"></div>
              </div>

              <div class="process-timeline__nodes">
                <div
                  v-for="(step, i) in stepsTimeline"
                  :key="'node-' + i"
                  class="process-timeline__node-col"
                  :id="'timeline-node-' + (i + 1)"
                >
                  <div class="process-timeline__circle">
                    <span>{{ toPersianNum(i + 1) }}</span>
                    <div class="process-timeline__circle-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 3: Bottom details (Description & Chips) -->
            <div class="process-timeline__bottom-row">
              <div
                v-for="(step, i) in stepsTimeline"
                :key="'bot-' + i"
                class="process-timeline__bot-col"
                :id="'timeline-bot-' + (i + 1)"
              >
                <p class="process-timeline__desc">{{ step.desc }}</p>
                <div class="process-timeline__chips">
                  <span v-for="(chip, cIdx) in step.chips" :key="cIdx" class="process-timeline__chip">
                    {{ chip }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Version: Vertical Step-by-Step Timeline -->
          <div class="process-timeline__mobile">
            <!-- Vertical laser beam track running along the right side (RTL) -->
            <div class="process-timeline__v-track">
              <div class="process-timeline__v-line-fill"></div>
            </div>

            <div class="process-timeline__v-steps">
              <div
                v-for="(step, i) in stepsTimeline"
                :key="'v-step-' + i"
                class="process-timeline__v-step"
                :id="'v-step-' + (i + 1)"
              >
                <div class="process-timeline__v-node">
                  <div class="process-timeline__circle">
                    <span>{{ toPersianNum(i + 1) }}</span>
                    <div class="process-timeline__circle-pulse"></div>
                  </div>
                </div>

                <div class="process-timeline__v-card">
                  <div class="process-timeline__v-card-header">
                    <span class="process-timeline__tag">مرحله {{ toPersianNum(i + 1) }}</span>
                    <h3 class="process-timeline__title">{{ step.title }}</h3>
                  </div>
                  <p class="process-timeline__desc">{{ step.desc }}</p>
                  <div class="process-timeline__chips">
                    <span v-for="(chip, cIdx) in step.chips" :key="cIdx" class="process-timeline__chip">
                      {{ chip }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3D Tech Hardware Banner Showcase -->
        <div class="process-banner-wrap" id="process-banner-wrap">
          <div class="process-banner-frame">
            <div class="process-banner-hud">
              <div class="hud-status">
                <span class="hud-dot"></span>
                <span>آنالیز فنی و بررسی عیب‌یابی سخت‌افزاری</span>
              </div>
              <div class="hud-badge">PRO DIAGNOSTIC 4.0</div>
            </div>
            <img :src="processBanner" alt="فرایند مشاوره خرید لپتاپ" class="process-banner-img" loading="lazy" decoding="async" />
          </div>
        </div>

        <!-- CTA Button -->
        <div class="how-preview__cta-wrap">
          <router-link to="/services" class="how-preview__btn" id="preview-cta">
            <span>مشاهده جزئیات کامل مراحل مشاوره</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SEO Content Section (مشاوره خرید لپتاپ) -->
    <section class="seo-content" id="seo-content-section">
      <div class="container">
        <div class="seo-content__header">
          <h2 class="section-title">خدمات مشاوره انتخاب لپتاپ، اینجا خرید و فروش نداریم!</h2>
          <p class="section-subtitle">ما هیچ لپتاپی نمی‌فروشیم. تنها خدمت ما مشاوره تخصصی و بی‌طرفانه برای انتخاب درست لپتاپ متناسب با نیاز شماست.</p>
        </div>

        <div class="seo-content__grid">
          <article class="seo-card" id="seo-moshavere">
            <div class="seo-card__icon">💡</div>
            <h3 class="seo-card__title">مشاوره خرید لپتاپ چیست؟</h3>
            <p class="seo-card__text">
              مشاوره خرید لپتاپ یعنی قبل از خرید، با یک متخصص سخت‌افزار صحبت کنید تا بر اساس رشته تحصیلی، حوزه کاری و بودجه شما، بهترین مدل لپتاپ نو یا استوک را پیشنهاد دهد. ما در این خدمت هیچ‌گونه فروشی نداریم و صرفاً راهنمایی خرید لپتاپ انجام می‌دهیم تا شما بدون ریسک و با اطمینان خرید کنید.
            </p>
          </article>

          <article class="seo-card" id="seo-daneshjooi">
            <div class="seo-card__icon">🎓</div>
            <h3 class="seo-card__title">لپتاپ دانشجویی مناسب کدام است؟</h3>
            <p class="seo-card__text">
              انتخاب لپتاپ دانشجویی به رشته تحصیلی بستگی دارد. دانشجوی معماری به گرافیک قوی و صفحه‌نمایش دقیق نیاز دارد، دانشجوی کامپیوتر به رم و پردازنده بالا، و دانشجوی علوم انسانی به لپتاپی سبک و با باتری بادوام. مشاور ما با تحلیل نیاز دقیق شما، بهترین لپتاپ دانشجویی را بدون هیچ تعصبی معرفی می‌کند.
            </p>
          </article>

          <article class="seo-card" id="seo-che-laptop">
            <div class="seo-card__icon">🤔</div>
            <h3 class="seo-card__title">چه لپتاپی بخرم؟</h3>
            <p class="seo-card__text">
              اگر نمی‌دانید چه لپتاپی بخرید، تنها نیستید. بازار لپتاپ پر از مدل‌ها و مشخصات فنی گیج‌کننده است. مشاور ما با پرسیدن چند سؤال ساده درباره نوع استفاده، بودجه و انتظارات شما، دقیقاً مشخص می‌کند کدام لپتاپ برای شما مناسب‌تر است — بدون اینکه چیزی بفروشد.
            </p>
          </article>

          <article class="seo-card" id="seo-rahnamayi">
            <div class="seo-card__icon">🗺️</div>
            <h3 class="seo-card__title">راهنمایی خرید لپتاپ نو و استوک</h3>
            <p class="seo-card__text">
              راهنمایی خرید لپتاپ شامل مقایسه مدل‌های نو و استوک، بررسی گارانتی، تست سلامت سخت‌افزار و تحلیل ارزش خرید است. در مشاوره ما، تمام این موارد بررسی می‌شود تا مطمئن شوید بهترین لپتاپ را با بهترین قیمت انتخاب کرده‌اید. خدمات ما کاملاً مستقل از فروشگاه‌هاست.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Features Section (چرا ما را انتخاب کنید؟) -->
    <section class="features" id="features-section">
      <div class="container">
        <div class="section-header-features">
          <h2 class="section-title">چرا ما را انتخاب کنید؟</h2>
          <p class="section-subtitle">با سال‌ها تجربه در حوزه سخت‌افزار، دقیق‌ترین راهنمایی را بدون تعصب ارائه می‌دهیم</p>
        </div>

        <div class="features__grid">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card"
          >
            <div class="feature-card__glow"></div>
            <div class="feature-card__icon" :style="{ background: feature.gradient }">
              <span v-html="feature.icon"></span>
            </div>
            <h3 class="feature-card__title">{{ feature.title }}</h3>
            <p class="feature-card__desc">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial / Trust Section with GSAP Dynamic Counters -->
    <section class="trust" id="trust-section">
      <div class="container">
        <div class="trust__grid">
          <div class="trust__stat" v-for="(stat, i) in stats" :key="i">
            <div class="trust__stat-value" :id="'stat-val-' + i">{{ stat.display }}</div>
            <div class="trust__stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from '../assets/images/hero.jpg'
import processBanner from '../assets/images/laptop_3d.jpg'

gsap.registerPlugin(ScrollTrigger)

const homeRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const features = [
  {
    icon: '🎯',
    title: 'تحلیل دقیق نیاز',
    description: 'با بررسی کامل رشته تحصیلی، حوزه کاری و نیازهای روزانه شما، بهترین مشخصات فنی را تعیین می‌کنیم.',
    gradient: 'linear-gradient(135deg, hsl(195, 70%, 92%), hsl(195, 65%, 85%))'
  },
  {
    icon: '💰',
    title: 'بهینه‌سازی بودجه',
    description: 'با توجه به بودجه شما، بهترین گزینه‌ها اعم از نو و استوک را با بهترین قیمت پیشنهاد می‌دهیم.',
    gradient: 'linear-gradient(135deg, hsl(170, 55%, 90%), hsl(170, 50%, 82%))'
  },
  {
    icon: '🔍',
    title: 'بررسی فنی کامل',
    description: 'تمام مشخصات فنی لپتاپ‌ها را با جزئیات بررسی و مقایسه می‌کنیم تا بهترین انتخاب ممکن را داشته باشید.',
    gradient: 'linear-gradient(135deg, hsl(220, 70%, 92%), hsl(220, 65%, 85%))'
  },
  {
    icon: '🛡️',
    title: 'تست سلامت لپتاپ',
    description: 'برای لپتاپ‌های استوک، تست سلامت کامل شامل بررسی هارد، باتری، صفحه نمایش و سایر قطعات انجام می‌دهیم.',
    gradient: 'linear-gradient(135deg, hsl(150, 55%, 90%), hsl(150, 50%, 82%))'
  },
  {
    icon: '🤝',
    title: 'همراهی تا پایان',
    description: 'از لحظه مشاوره تا خرید نهایی و حتی بعد از آن، ما همراه شما هستیم و پشتیبانی کامل ارائه می‌دهیم.',
    gradient: 'linear-gradient(135deg, hsl(38, 80%, 92%), hsl(38, 75%, 85%))'
  },
  {
    icon: '⚡',
    title: 'پاسخگویی سریع',
    description: 'تیم ما همیشه آماده پاسخگویی به سؤالات شما است. در کمترین زمان ممکن، مشاوره دریافت خواهید کرد.',
    gradient: 'linear-gradient(135deg, hsl(280, 55%, 92%), hsl(280, 50%, 85%))'
  }
]

const stepsTimeline = [
  {
    title: 'تعیین رشته و نیاز',
    desc: 'شناسایی رشته دانشگاهی یا کاری، نرم‌افزارهای مورد استفاده و سقف بودجه',
    chips: ['تحلیل رشته', 'نرم‌افزارها', 'بودجه‌بندی']
  },
  {
    title: 'انتخاب نو یا استوک',
    desc: 'بررسی تخصصی ارزش خرید، گارانتی شرکتی و صرفه‌جویی اقتصادی',
    chips: ['پلمپ کارخانه', 'استوک گرید A++', 'ارزش خرید']
  },
  {
    title: 'تعیین مدل و مشخصات',
    desc: 'تحلیل دقیق مشخصات سخت‌افزاری، پردازنده، گرافیک، رم و هارد SSD',
    chips: ['تست Task Manager', 'انتخاب کانفیگ', 'گزارش فنی']
  },
  {
    title: 'همراهی و تست سلامت',
    desc: 'همراهی تا خرید نهایی و انجام تست سلامت قطعات و ضمانت سلامت دستگاه',
    chips: ['تست سلامت باتری', 'بررسی صفحه و هارد', 'پشتیبانی']
  }
]

const stats = [
  { target: 50, prefix: '+', suffix: '', label: 'مشاوره موفق', display: '+۵۰' },
  { target: 98, prefix: '', suffix: '٪', label: 'رضایت مشتری', display: '۹۸٪' },
  { target: 5, prefix: '+', suffix: '', label: 'سال تجربه', display: '+۵' },
  { target: null, prefix: '', suffix: '', label: 'پشتیبانی تخصصی', display: '۲۴/۷' }
]

function toPersianNum(num: number | string) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  return String(num).replace(/\d/g, d => persianDigits[Number(d)])
}

onMounted(() => {
  ctx = gsap.context(() => {
    // -------------------------------------------------------------
    // 1. HERO ENTRANCE CINEMATIC TIMELINE (Fast & Snappy Load)
    // -------------------------------------------------------------
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Atmospheric Background Zoom & Glow Reveal (Quick & optimized)
    heroTl
      .fromTo('.hero__bg-img',
        { scale: 1.15, filter: 'blur(5px) brightness(0.7)' },
        { scale: 1.05, filter: 'blur(0px) brightness(0.85)', duration: 0.85, ease: 'power2.out' }
      )
      .fromTo('.hero__tech-grid',
        { opacity: 0 },
        { opacity: 0.22, duration: 0.5 },
        '-=0.7'
      )
      .fromTo(['.hero__tech-flare--1', '.hero__tech-flare--2'],
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
        '-=0.65'
      )
      // Floating Cyber Particles
      .fromTo('.particle',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.8, duration: 0.45, stagger: 0.06, ease: 'back.out(2)' },
        '-=0.55'
      )
      // Hero Badge with snappy bounce
      .fromTo('.hero__badge',
        { y: -25, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.8)' },
        '-=0.5'
      )
      // Title slide up immediately
      .fromTo('.hero__title',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.38'
      )
      // Subtitle
      .fromTo('.hero__subtitle',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
        '-=0.35'
      )
      // Buttons
      .fromTo('.hero__actions .hero__btn',
        { y: 20, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(1.5)' },
        '-=0.3'
      )
      // Floating visual cards 3D pop (fast and crisp)
      .fromTo('.hero__card',
        { y: 45, opacity: 0, scale: 0.82, rotation: -5 },
        { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.55, stagger: 0.09, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      // Scroll indicator fade
      .fromTo('.hero__scroll-indicator',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      )

    // Desktop-only floating motion, mouse parallax and scroll scrub
    const isDesktop = window.matchMedia('(min-width: 769px)').matches

    if (isDesktop) {
      // Continuous smooth floating loop on the cards
      gsap.to('.hero__card--first', {
        y: '-=15',
        rotation: 1.5,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.to('.hero__card--second', {
        y: '+=14',
        rotation: -1.5,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.6
      })
      gsap.to('.hero__card--third', {
        y: '-=12',
        rotation: 1,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2
      })

      // Hero Interactive Mouse 3D Parallax Tilt
      const heroEl = document.querySelector<HTMLElement>('.hero')
      if (heroEl) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e
          const { innerWidth, innerHeight } = window
          const xOffset = (clientX / innerWidth - 0.5) * 22
          const yOffset = (clientY / innerHeight - 0.5) * 22

          gsap.to('.hero__visual', {
            rotateY: xOffset * 0.9,
            rotateX: -yOffset * 0.9,
            duration: 0.7,
            ease: 'power1.out',
            transformPerspective: 1000
          })

          gsap.to('.hero__tech-flare--1', {
            x: xOffset * 2,
            y: yOffset * 2,
            duration: 1.2,
            ease: 'power1.out'
          })
          gsap.to('.hero__tech-flare--2', {
            x: -xOffset * 1.5,
            y: -yOffset * 1.5,
            duration: 1.2,
            ease: 'power1.out'
          })
        }
        heroEl.addEventListener('mousemove', handleMouseMove)
      }

      // Hero parallax on scroll (Desktop only)
      gsap.to('.hero__content', {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 130,
        opacity: 0.1,
        ease: 'none'
      })
    }

    gsap.to('.hero__bg-img', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 90,
      scale: 1.15,
      ease: 'none'
    })

    // -------------------------------------------------------------
    // 3. PROCESS TIMELINE: RESPONSIVE ANIMATIONS (Desktop & Mobile)
    // -------------------------------------------------------------
    // Section Header reveal
    gsap.fromTo('.section-header-anim',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.how-preview',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    ScrollTrigger.matchMedia({
      // Desktop: Horizontal Timeline (> 820px)
      "(min-width: 821px)": () => {
        // Horizontal laser fill beam across the timeline line (RTL)
        gsap.fromTo('.process-timeline__line-fill',
          { width: '0%' },
          {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.process-timeline__desktop',
              start: 'top 75%',
              end: 'bottom 65%',
              scrub: 0.4
            }
          }
        )

        // Desktop Timeline Nodes & Text activation
        const nodeCols = gsap.utils.toArray<HTMLElement>('.process-timeline__node-col')
        nodeCols.forEach((node, i) => {
          const topCol = document.querySelector(`#timeline-top-${i + 1}`)
          const botCol = document.querySelector(`#timeline-bot-${i + 1}`)
          const circle = node.querySelector<HTMLElement>('.process-timeline__circle')

          const nodeTl = gsap.timeline({
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          })

          if (circle) {
            nodeTl.fromTo(circle,
              { scale: 0.3, opacity: 0, rotation: -45 },
              {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.7,
                ease: 'back.out(2.2)'
              }
            )
          }
          if (topCol) {
            nodeTl.fromTo(topCol,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              '-=0.45'
            )
          }
          if (botCol) {
            nodeTl.fromTo(botCol,
              { y: -30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              '-=0.45'
            )
          }
        })
      },

      // Mobile: Vertical Step-by-Step Timeline (<= 820px)
      "(max-width: 820px)": () => {
        // Vertical Laser Fill
        gsap.fromTo('.process-timeline__v-line-fill',
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.process-timeline__mobile',
              start: 'top 85%',
              end: 'bottom 70%',
              scrub: 0.3
            }
          }
        )

        // Mobile Vertical Steps: Smooth progressive reveals
        const vSteps = gsap.utils.toArray<HTMLElement>('.process-timeline__v-step')
        vSteps.forEach((step) => {
          const circle = step.querySelector<HTMLElement>('.process-timeline__circle')
          const card = step.querySelector<HTMLElement>('.process-timeline__v-card')

          const stepTl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          })

          if (circle) {
            stepTl.fromTo(circle,
              { scale: 0.4, opacity: 0, rotation: -30 },
              {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.55,
                ease: 'back.out(2)'
              }
            )
          }

          if (card) {
            stepTl.fromTo(card,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
              },
              '-=0.35'
            )
          }
        })
      }
    })

    // -------------------------------------------------------------
    // 4. 3D LAPTOP HARDWARE BANNER REVEAL
    // -------------------------------------------------------------
    gsap.fromTo('.process-banner-frame',
      {
        rotateX: 18,
        y: 70,
        opacity: 0.35,
        scale: 0.93,
        transformPerspective: 1200
      },
      {
        rotateX: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-banner-wrap',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo('.how-preview__cta-wrap',
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: '.how-preview__cta-wrap',
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // -------------------------------------------------------------
    // 5. FEATURE CARDS 3D STAGGER & HOVER GLOW
    // -------------------------------------------------------------
    gsap.fromTo('.section-header-features',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo('.feature-card',
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotateY: (index) => (index % 2 === 0 ? -6 : 6),
        transformPerspective: 800
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features__grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // -------------------------------------------------------------
    // 5.5. SEO CONTENT SECTION REVEAL
    // -------------------------------------------------------------
    gsap.fromTo('.seo-content__header',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.seo-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo('.seo-card',
      {
        opacity: 0,
        y: 50,
        scale: 0.92
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.seo-content__grid',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    //
    // 6. TRUST STATS DYNAMIC NUMERIC COUNTERS ON SCROLL
    // -------------------------------------------------------------
    const statCards = gsap.utils.toArray<HTMLElement>('.trust__stat')
    statCards.forEach((card, index) => {
      const valEl = card.querySelector<HTMLElement>('.trust__stat-value')
      const targetVal = stats[index].target
      const prefix = stats[index].prefix || ''
      const suffix = stats[index].suffix || ''
      const counter = { val: 0 }

      gsap.fromTo(card,
        { opacity: 0, y: 45, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.trust__grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (targetVal !== null) {
                gsap.to(counter, {
                  val: targetVal,
                  duration: 1.2,
                  ease: 'power2.out',
                  onUpdate: () => {
                    if (valEl) {
                      valEl.textContent = prefix + toPersianNum(Math.floor(counter.val)) + suffix
                    }
                  }
                })
              }
            }
          }
        }
      )
    })
  }, homeRef.value ?? undefined)

  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 150)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped>
/* ============================================
   Hero Section
   ============================================ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1200px;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform, filter;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    hsla(215, 90%, 7%, 0.92) 0%,
    hsla(200, 85%, 11%, 0.86) 40%,
    hsla(195, 75%, 16%, 0.78) 70%,
    hsla(170, 60%, 18%, 0.72) 100%
  );
  z-index: 1;
}

/* Cyber Matrix Grid */
.hero__tech-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(hsla(195, 80%, 60%, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, hsla(195, 80%, 60%, 0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 25%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 25%, transparent 80%);
  pointer-events: none;
  z-index: 2;
}

/* Glowing Cyber Flares */
.hero__tech-flare {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 2;
  will-change: transform;
}

.hero__tech-flare--1 {
  width: 500px;
  height: 500px;
  top: 10%;
  right: 15%;
  background: radial-gradient(circle, hsla(170, 75%, 45%, 0.3) 0%, transparent 70%);
}

.hero__tech-flare--2 {
  width: 450px;
  height: 450px;
  bottom: 10%;
  left: 10%;
  background: radial-gradient(circle, hsla(195, 85%, 50%, 0.28) 0%, transparent 70%);
}

/* Ambient Cyber Particles */
.hero__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 12px #38bdf8, 0 0 24px #06b6d4;
  animation: float-particle 5s ease-in-out infinite alternate;
}

.particle--1 { top: 25%; right: 20%; animation-duration: 4.5s; background: #34d399; box-shadow: 0 0 14px #34d399; }
.particle--2 { top: 60%; right: 40%; animation-duration: 6s; }
.particle--3 { top: 35%; left: 25%; animation-duration: 5.2s; background: #34d399; box-shadow: 0 0 14px #34d399; }
.particle--4 { top: 75%; left: 45%; animation-duration: 4s; }

@keyframes float-particle {
  0% { transform: translateY(0) scale(0.9); opacity: 0.4; }
  100% { transform: translateY(-25px) scale(1.3); opacity: 0.9; }
}

.hero__content {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--nav-height);
  gap: var(--space-10);
  will-change: transform, opacity;
}

.hero__text {
  max-width: 640px;
}

.hero__badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  background: hsla(170, 70%, 50%, 0.16);
  border: 1px solid hsla(170, 70%, 50%, 0.35);
  color: hsl(170, 70%, 75%);
  font-size: var(--font-size-sm);
  font-weight: 600;
  margin-bottom: var(--space-6);
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 0 20px hsla(170, 60%, 50%, 0.15);
}

.hero__badge-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: hsl(170, 75%, 50%);
  box-shadow: 0 0 10px hsl(170, 80%, 50%);
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero__badge-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, hsla(0, 0%, 100%, 0.3), transparent);
  animation: badge-shimmer 4s infinite;
}

@keyframes badge-shimmer {
  0% { left: -100%; }
  35%, 100% { left: 100%; }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.4); }
}

.hero__title {
  font-size: var(--font-size-5xl);
  font-weight: 900;
  color: white;
  line-height: 1.3;
  margin-bottom: var(--space-6);
  letter-spacing: -0.02em;
}

.hero__title-accent {
  background: linear-gradient(135deg, hsl(170, 70%, 55%), hsl(195, 80%, 65%), #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px hsla(195, 80%, 60%, 0.3));
}

.hero__subtitle {
  font-size: var(--font-size-lg);
  color: hsla(195, 30%, 85%, 0.95);
  line-height: 1.9;
  margin-bottom: var(--space-8);
  max-width: 520px;
}

.hero__actions {
  display: flex;
  gap: var(--space-4);
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-8);
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
  font-weight: 700;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.hero__btn--primary {
  background: linear-gradient(135deg, var(--color-accent-400), var(--color-primary-500));
  color: white;
  box-shadow: 0 6px 25px hsla(170, 65%, 45%, 0.4), 0 0 15px hsla(195, 75%, 45%, 0.25);
  border: 1px solid hsla(170, 80%, 60%, 0.3);
}

.hero__btn--primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 35px hsla(170, 70%, 45%, 0.55), 0 0 25px hsla(195, 85%, 50%, 0.4);
}

.hero__btn--secondary {
  background: hsla(0, 0%, 100%, 0.08);
  color: white;
  border: 1px solid hsla(0, 0%, 100%, 0.25);
  backdrop-filter: blur(12px);
}

.hero__btn--secondary:hover {
  background: hsla(0, 0%, 100%, 0.18);
  border-color: hsla(0, 0%, 100%, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px hsla(0, 0%, 0%, 0.2);
}

/* 3D Floating Visual Cards */
.hero__visual {
  position: relative;
  flex-shrink: 0;
  width: 320px;
  height: 320px;
  transform-style: preserve-3d;
  will-change: transform;
}

.hero__visual-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, hsla(170, 80%, 45%, 0.2) 0%, hsla(195, 80%, 45%, 0.1) 50%, transparent 70%);
  filter: blur(35px);
  pointer-events: none;
}

.hero__card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-xl);
  background: hsla(215, 45%, 15%, 0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid hsla(195, 60%, 65%, 0.25);
  color: white;
  min-width: 220px;
  box-shadow: 0 16px 36px hsla(215, 80%, 6%, 0.4), 0 0 20px hsla(195, 80%, 50%, 0.15);
  will-change: transform;
}

.hero__card--first {
  top: 20px;
  right: 0;
}

.hero__card--second {
  bottom: 20px;
  left: 0;
}

.hero__card--third {
  top: 48%;
  right: -25px;
  transform: translateY(-50%);
  border-color: hsla(170, 70%, 50%, 0.35);
  box-shadow: 0 14px 34px hsla(215, 80%, 6%, 0.4), 0 0 25px hsla(170, 75%, 45%, 0.25);
}

.hero__card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  background: hsla(170, 60%, 45%, 0.25);
  border: 1px solid hsla(170, 60%, 50%, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  box-shadow: 0 0 15px hsla(170, 70%, 50%, 0.25);
}

.hero__card-icon--star {
  background: hsla(38, 90%, 50%, 0.22);
  border-color: hsla(38, 90%, 55%, 0.4);
  box-shadow: 0 0 15px hsla(38, 90%, 50%, 0.25);
}

.hero__card-icon--chip {
  background: hsla(195, 85%, 50%, 0.25);
  border-color: hsla(195, 85%, 55%, 0.45);
  box-shadow: 0 0 15px hsla(195, 85%, 50%, 0.3);
}

.hero__card strong {
  display: block;
  font-size: var(--font-size-base);
  font-weight: 800;
  color: #f8fafc;
}

.hero__card span {
  font-size: var(--font-size-xs);
  color: hsla(195, 30%, 80%, 0.85);
}

/* Scroll Indicator */
.hero__scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.hero__scroll-mouse {
  width: 24px;
  height: 38px;
  border: 2px solid hsla(0, 0%, 100%, 0.45);
  border-radius: 12px;
  position: relative;
  box-shadow: 0 0 12px hsla(195, 80%, 50%, 0.2);
}

.hero__scroll-wheel {
  width: 3px;
  height: 8px;
  background: #38bdf8;
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 8px #38bdf8;
  animation: scroll-wheel 2s ease-in-out infinite;
}

.hero__scroll-text {
  font-size: 0.72rem;
  color: hsla(0, 0%, 100%, 0.65);
  font-weight: 600;
  letter-spacing: 0.05em;
}

@keyframes scroll-wheel {
  0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
  50% { opacity: 0.2; transform: translateX(-50%) translateY(9px); }
}

/* ============================================
   Process Timeline & Banner (فرایند مشاوره)
   ============================================ */
.how-preview {
  padding: var(--space-20) 0 var(--space-24);
  background: linear-gradient(180deg, var(--color-primary-50) 0%, hsla(195, 70%, 96%, 0.4) 60%, transparent 100%);
  position: relative;
  overflow: hidden;
}

.section-header-anim {
  will-change: transform, opacity;
}

.process-timeline {
  position: relative;
  margin-top: var(--space-12);
  margin-bottom: var(--space-12);
  padding: var(--space-4) 0;
}

.process-timeline__desktop {
  display: block;
}

.process-timeline__mobile {
  display: none;
}

/* ============================================
   Vertical Timeline Styles (Mobile)
   ============================================ */
.process-timeline__mobile {
  position: relative;
  padding: var(--space-4) 0;
  margin: var(--space-6) 0;
}

.process-timeline__v-track {
  position: absolute;
  top: 24px;
  bottom: 24px;
  right: 23px; /* Center of the 48px circle node in RTL */
  width: 4px;
  background: hsla(215, 20%, 82%, 0.45);
  border-radius: var(--radius-full);
  overflow: hidden;
  z-index: 1;
}

.process-timeline__v-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0%;
  background: linear-gradient(180deg, #10b981 0%, #06b6d4 50%, #0284c7 100%);
  box-shadow: 0 0 16px #06b6d4, 0 0 24px #10b981;
  border-radius: var(--radius-full);
  will-change: height;
}

.process-timeline__v-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  position: relative;
  z-index: 2;
}

.process-timeline__v-step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.process-timeline__v-node {
  flex-shrink: 0;
  position: relative;
  z-index: 3;
}

.process-timeline__v-step .process-timeline__circle {
  width: 48px;
  height: 48px;
  font-size: var(--font-size-lg);
  border-width: 3px;
  box-shadow: 0 4px 16px hsla(195, 75%, 35%, 0.35);
}

.process-timeline__v-card {
  flex: 1;
  background: var(--surface-card);
  border: 1px solid var(--color-neutral-100);
  border-radius: var(--radius-xl);
  padding: var(--space-4) var(--space-5);
  box-shadow: 0 6px 20px hsla(210, 20%, 10%, 0.06);
  transition: box-shadow var(--transition-base), border-color var(--transition-base);
  text-align: right;
  will-change: transform, opacity;
}

.process-timeline__v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px hsla(195, 70%, 50%, 0.12);
  border-color: var(--color-primary-200);
}

.process-timeline__v-card-header {
  margin-bottom: var(--space-2);
}

.process-timeline__v-card .process-timeline__tag {
  display: inline-block;
  margin-bottom: var(--space-1);
}

.process-timeline__v-card .process-timeline__title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-2);
}

.process-timeline__v-card .process-timeline__desc {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-600);
  line-height: 1.8;
  margin-bottom: var(--space-3);
  max-width: 100%;
}

.process-timeline__v-card .process-timeline__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  justify-content: flex-start;
}

.process-timeline__top-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  text-align: center;
  margin-bottom: var(--space-2);
}

.process-timeline__top-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0 var(--space-2);
  will-change: transform, opacity;
}

.process-timeline__tag {
  display: inline-block;
  padding: 3px 12px;
  border-radius: var(--radius-full);
  background: hsla(195, 75%, 45%, 0.14);
  color: var(--color-primary-600);
  font-size: var(--font-size-xs);
  font-weight: 800;
  margin-bottom: var(--space-2);
}

.process-timeline__title {
  font-size: var(--font-size-base);
  font-weight: 800;
  color: var(--color-neutral-900);
  line-height: 1.4;
}

.process-timeline__track {
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}

.process-timeline__line {
  position: absolute;
  top: 50%;
  left: 12.5%;
  right: 12.5%;
  height: 6px;
  background: hsla(215, 20%, 82%, 0.45);
  border-radius: var(--radius-full);
  z-index: 1;
  transform: translateY(-50%);
  overflow: hidden;
}

/* RTL Laser fill bar */
.process-timeline__line-fill {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #0284c7 0%, #06b6d4 50%, #10b981 100%);
  box-shadow: 0 0 18px #06b6d4, 0 0 30px #10b981;
  border-radius: var(--radius-full);
  will-change: width;
}

.process-timeline__nodes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  position: relative;
  z-index: 2;
}

.process-timeline__node-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-timeline__circle {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-accent-500) 100%);
  border: 4px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px hsla(195, 75%, 35%, 0.35), 0 0 0 4px hsla(195, 70%, 50%, 0.18);
  color: white;
  font-size: var(--font-size-xl);
  font-weight: 900;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  will-change: transform, opacity;
}

.process-timeline__circle:hover {
  transform: scale(1.18);
  box-shadow: 0 12px 30px hsla(195, 80%, 40%, 0.55), 0 0 0 7px hsla(170, 70%, 50%, 0.35);
}

.process-timeline__circle-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid hsla(170, 70%, 50%, 0.4);
  animation: pulse-ring 2.5s infinite;
  pointer-events: none;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(1.35); opacity: 0; }
}

.process-timeline__bottom-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  text-align: center;
  margin-top: var(--space-2);
}

.process-timeline__bot-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--space-2);
  will-change: transform, opacity;
}

.process-timeline__desc {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-600);
  line-height: 1.8;
  margin-bottom: var(--space-3);
  max-width: 240px;
}

.process-timeline__chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-1);
}

.process-timeline__chip {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: var(--surface-card);
  border: 1px solid var(--color-neutral-200);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-neutral-600);
}

/* 3D Hardware Banner with HUD & Laser Scanner */
.process-banner-wrap {
  margin: var(--space-12) 0 var(--space-10);
  perspective: 1200px;
}

.process-banner-frame {
  position: relative;
  width: 100%;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: 0 20px 50px hsla(215, 80%, 10%, 0.25), 0 0 35px hsla(195, 85%, 45%, 0.2);
  border: 1px solid hsla(195, 80%, 50%, 0.35);
  background: #080f24;
  transition: box-shadow 0.4s ease, border-color 0.4s ease;
  will-change: transform, opacity;
}

.process-banner-frame:hover {
  box-shadow: 0 28px 60px hsla(215, 80%, 10%, 0.35), 0 0 50px hsla(195, 85%, 45%, 0.35);
  border-color: hsla(170, 80%, 55%, 0.5);
}

.process-banner-hud {
  position: absolute;
  top: 16px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 6;
  pointer-events: none;
}

.hud-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: hsla(215, 85%, 10%, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid hsla(170, 70%, 50%, 0.35);
  color: #6ee7b7;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 15px hsla(0, 0%, 0%, 0.3);
}

.hud-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: pulse-dot 1.5s infinite;
}

.hud-badge {
  padding: 4px 12px;
  border-radius: 9999px;
  background: hsla(195, 85%, 15%, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid hsla(195, 75%, 50%, 0.35);
  color: #38bdf8;
  font-size: 0.75rem;
  font-family: monospace;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.process-banner-img {
  width: 100%;
  height: auto;
  display: block;
}

.how-preview__cta-wrap {
  text-align: center;
  margin-top: var(--space-8);
  will-change: transform, opacity;
}

.how-preview__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-10);
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
  color: white;
  font-weight: 700;
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
  box-shadow: 0 6px 25px hsla(195, 70%, 42%, 0.35);
}

.how-preview__btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 35px hsla(195, 75%, 42%, 0.5);
}

/* ============================================
   Features Section
   ============================================ */
.features {
  padding: var(--space-24) 0;
  position: relative;
}

.section-header-features {
  will-change: transform, opacity;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  perspective: 1000px;
}

.feature-card {
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--surface-card);
  border: 1px solid var(--color-neutral-100);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  position: relative;
  overflow: hidden;
  will-change: transform, opacity;
}

.feature-card__glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, hsla(195, 80%, 50%, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px hsla(210, 20%, 10%, 0.1), 0 0 25px hsla(195, 70%, 50%, 0.15);
  border-color: var(--color-primary-300);
}

.feature-card:hover .feature-card__glow {
  transform: scale(1.6);
}

.feature-card__icon {
  width: 58px;
  height: 58px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: var(--space-5);
  transition: transform 0.35s ease;
}

.feature-card:hover .feature-card__icon {
  transform: scale(1.12) rotate(4deg);
}

.feature-card__title {
  font-size: var(--font-size-lg);
  font-weight: 800;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-3);
}

.feature-card__desc {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
  line-height: 1.8;
}

/* ============================================
   SEO Content Section
   ============================================ */
.seo-content {
  padding: var(--space-24) 0;
  position: relative;
}

.seo-content__header {
  will-change: transform, opacity;
}

.seo-content__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-8);
}

.seo-card {
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--surface-card);
  border: 1px solid var(--color-neutral-100);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  position: relative;
  will-change: transform, opacity;
}

.seo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 36px hsla(210, 20%, 10%, 0.1), 0 0 22px hsla(195, 70%, 50%, 0.12);
  border-color: var(--color-primary-300);
}

.seo-card__icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, hsl(195, 70%, 92%), hsl(195, 65%, 85%));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: var(--space-4);
  transition: transform 0.35s ease;
}

.seo-card:hover .seo-card__icon {
  transform: scale(1.1) rotate(3deg);
}

.seo-card__title {
  font-size: var(--font-size-lg);
  font-weight: 800;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-3);
}

.seo-card__text {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-600);
  line-height: 2;
  text-align: justify;
}

/* ============================================
   Trust / Stats Section
   ============================================ */
.trust {
  padding: var(--space-20) 0;
}

.trust__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

.trust__stat {
  text-align: center;
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--surface-card);
  border: 1px solid var(--color-neutral-100);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  will-change: transform, opacity;
}

.trust__stat:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px hsla(210, 20%, 10%, 0.1), 0 0 20px hsla(195, 70%, 50%, 0.12);
  border-color: var(--color-primary-300);
}

.trust__stat-value {
  font-size: var(--font-size-4xl);
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-2);
  font-feature-settings: 'tnum';
}

.trust__stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
  font-weight: 600;
}

/* ============================================
   Responsive
   ============================================ */
@media (max-width: 1024px) {
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 820px) {
  .process-timeline {
    overflow-x: visible;
  }
  .process-timeline__desktop {
    display: none !important;
  }
  .process-timeline__mobile {
    display: block !important;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    overflow: visible;
    overflow-x: clip;
    padding-top: calc(var(--nav-height) + var(--space-4));
    padding-bottom: var(--space-12);
  }

  .hero__content {
    flex-direction: column;
    text-align: center;
    padding-top: var(--space-4);
    padding-bottom: var(--space-4);
    gap: var(--space-6);
  }

  .hero__title {
    font-size: 2.1rem;
    line-height: 1.35;
    margin-bottom: var(--space-4);
  }

  .hero__subtitle {
    font-size: var(--font-size-base);
    margin-inline: auto;
    margin-bottom: var(--space-6);
  }

  .hero__actions {
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }

  .hero__actions .hero__btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  /* Mobile Hero Visual Cards Layout */
  .hero__visual {
    width: 100%;
    max-width: 360px;
    height: auto;
    margin: var(--space-2) auto 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    perspective: none;
    transform: none !important;
  }

  .hero__visual-glow {
    display: none;
  }

  .hero__card {
    position: relative !important;
    top: auto !important;
    bottom: auto !important;
    left: auto !important;
    right: auto !important;
    transform: none !important;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    padding: var(--space-3) var(--space-4);
    background: hsla(215, 50%, 14%, 0.85);
    border: 1px solid hsla(195, 60%, 60%, 0.3);
    box-shadow: 0 8px 24px hsla(215, 80%, 5%, 0.4);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    text-align: right;
  }

  .hero__card--third {
    display: flex !important;
  }

  .hero__card strong {
    font-size: var(--font-size-base);
  }

  .hero__card span {
    font-size: var(--font-size-xs);
  }

  .hero__scroll-indicator {
    display: none;
  }

  /* Hide HUD extra notes on mobile for process-banner-img */
  .process-banner-hud {
    display: none !important;
  }

  .features__grid {
    grid-template-columns: 1fr;
  }

  .seo-content__grid {
    grid-template-columns: 1fr;
  }

  .trust__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 1.85rem;
  }
  .hero__visual {
    max-width: 100%;
    padding-inline: var(--space-1);
  }
  .hero__card {
    padding: var(--space-3);
  }
}
</style>
