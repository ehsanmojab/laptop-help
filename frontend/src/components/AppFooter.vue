<template>
  <footer class="footer" id="app-footer">
    <div class="footer__wave">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z" fill="currentColor"/>
      </svg>
    </div>
    <div class="footer__content">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand -->
          <div class="footer__brand">
            <div class="footer__logo">
              <div class="footer__logo-icon">
                <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
                  <defs>
                    <linearGradient id="footerLogoG1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#06b6d4"/>
                      <stop offset="60%" stop-color="#38bdf8"/>
                      <stop offset="100%" stop-color="#818cf8"/>
                    </linearGradient>
                    <linearGradient id="footerLogoG2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#34d399"/>
                      <stop offset="100%" stop-color="#38bdf8"/>
                    </linearGradient>
                  </defs>
                  <rect x="5" y="5" width="24" height="16" rx="4" fill="url(#footerLogoG1)"/>
                  <rect x="7" y="7" width="20" height="12" rx="2.5" fill="#0b1329"/>
                  <path d="M10 13h3.5l2-3 2.5 6 2-3H24" stroke="url(#footerLogoG2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 24c0-.8.7-1.5 1.5-1.5h27c.8 0 1.5.7 1.5 1.5v.8c0 1.5-1.2 2.7-2.7 2.7H4.7C3.2 27.5 2 26.3 2 24.8V24z" fill="url(#footerLogoG2)"/>
                  <rect x="13.5" y="22.5" width="7" height="1.8" rx="0.9" fill="#ffffff" opacity="0.9"/>
                </svg>
              </div>
              <span>مشاوره خرید لپتاپ</span>
            </div>
            <p class="footer__desc">
              ما با تجربه و دانش فنی خود، شما را در انتخاب بهترین لپتاپ متناسب با نیاز و بودجه‌تان یاری می‌کنیم.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="footer__section">
            <h3 class="footer__heading">دسترسی سریع</h3>
            <ul class="footer__list">
              <li><router-link to="/">صفحه اصلی</router-link></li>
              <li><router-link to="/forum">تالار گفتگو</router-link></li>
              <li><router-link to="/services">خدمات ما</router-link></li>
              <li><router-link to="/team">تیم ما</router-link></li>
              <li><router-link to="/contact">تماس با ما</router-link></li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer__section">
            <h3 class="footer__heading">تماس با ما</h3>
            <ul class="footer__list footer__contact">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                ۰۹۳۳-۳۷۲-۹۲۸۰
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@laptop-consulting.ir
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p>© {{ currentYear }} مشاوره خرید لپتاپ. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  position: relative;
  margin-top: var(--space-20);
}

.footer__wave {
  color: var(--color-primary-800);
  line-height: 0;
}

.footer__wave svg {
  width: 100%;
  height: 80px;
}

.footer__content {
  background: var(--color-primary-800);
  padding: var(--space-12) 0 var(--space-6);
  color: var(--color-primary-100);
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-10);
}

.footer__brand {
  max-width: 360px;
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: white;
  margin-bottom: var(--space-4);
}

.footer__logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: hsla(0, 0%, 100%, 0.15);
  color: var(--color-primary-200);
}

.footer__desc {
  font-size: var(--font-size-sm);
  line-height: 1.8;
  color: var(--color-primary-200);
}

.footer__heading {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: white;
  margin-bottom: var(--space-4);
}

.footer__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__list a,
.footer__list li {
  font-size: var(--font-size-sm);
  color: var(--color-primary-200);
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.footer__list a:hover {
  color: white;
}

.footer__bottom {
  margin-top: var(--space-10);
  padding-top: var(--space-6);
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  text-align: center;
  font-size: var(--font-size-xs);
  color: var(--color-primary-300);
}

@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .footer__brand {
    max-width: none;
  }
}
</style>
