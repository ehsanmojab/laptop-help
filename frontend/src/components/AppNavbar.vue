<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled, 'navbar--mobile-open': isMobileOpen, 'navbar--dark': isDark }">
    <div class="navbar__inner container">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo" id="nav-logo">
        <div class="navbar__logo-icon">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <defs>
              <linearGradient id="navLogoG1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#06b6d4"/>
                <stop offset="60%" stop-color="#3b82f6"/>
                <stop offset="100%" stop-color="#8b5cf6"/>
              </linearGradient>
              <linearGradient id="navLogoG2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#10b981"/>
                <stop offset="100%" stop-color="#06b6d4"/>
              </linearGradient>
            </defs>
            <!-- Laptop Screen -->
            <rect x="5" y="5" width="24" height="16" rx="4" fill="url(#navLogoG1)"/>
            <!-- Screen Interior -->
            <rect x="7" y="7" width="20" height="12" rx="2.5" fill="#0b1329"/>
            <!-- Performance pulse line -->
            <path d="M10 13h3.5l2-3 2.5 6 2-3H24" stroke="url(#navLogoG2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Laptop Base -->
            <path d="M2 24c0-.8.7-1.5 1.5-1.5h27c.8 0 1.5.7 1.5 1.5v.8c0 1.5-1.2 2.7-2.7 2.7H4.7C3.2 27.5 2 26.3 2 24.8V24z" fill="url(#navLogoG2)"/>
            <!-- Touchpad indent -->
            <rect x="13.5" y="22.5" width="7" height="1.8" rx="0.9" fill="#ffffff" opacity="0.9"/>
          </svg>
        </div>
        <span class="navbar__logo-text">مشاوره لپتاپ</span>
      </router-link>

      <!-- Desktop Navigation -->
      <ul class="navbar__links" id="nav-links">
        <li v-for="link in navLinks" :key="link.to">
          <router-link
            :to="link.to"
            class="navbar__link"
            :id="'nav-' + link.id"
            active-class="navbar__link--active"
          >
            {{ link.label }}
          </router-link>
        </li>
      </ul>

      <!-- Theme Toggle & CTA -->
      <div class="navbar__actions">
        <!-- Auth Profile / Login Button (Only visible on Forum pages) -->
        <template v-if="isForumPage">
          <div v-if="authStore.isAuthenticated" class="navbar__user-menu">
            <div class="navbar__user-badge">
              <img
                :src="authStore.user?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'"
                class="navbar__user-avatar"
                alt="پروفایل"
              />
              <span class="navbar__user-name">{{ authStore.user?.firstName && authStore.user?.lastName ? authStore.user.firstName + ' ' + authStore.user.lastName : authStore.user?.username }}</span>
            </div>
            <button
              class="navbar__logout-btn"
              @click="authStore.logout"
              title="خروج از حساب"
              aria-label="خروج"
            >
              <LogOut :size="16" />
            </button>
          </div>
          <button
            v-else
            class="navbar__auth-btn"
            @click="authStore.openLogin"
            id="nav-login-btn"
          >
            <LogIn :size="16" />
            <span>ورود / عضویت</span>
          </button>
        </template>

        <button
          type="button"
          class="navbar__theme-btn"
          @click="toggleTheme"
          :title="isDark ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'"
          aria-label="تغییر تم"
        >
          <Sun v-if="isDark" :size="19" class="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
          <Moon v-else :size="19" :class="isScrolled ? 'text-slate-700' : 'text-white drop-shadow-sm'" />
        </button>

        <router-link to="/contact" class="navbar__cta" id="nav-cta">
          <PhoneCall :size="17" />
          <span>تماس با ما</span>
        </router-link>

        <!-- Mobile Menu Button -->
        <button
          class="navbar__mobile-toggle"
          id="nav-mobile-toggle"
          @click="toggleMobile"
          :aria-expanded="isMobileOpen"
          aria-label="منوی موبایل"
        >
          <span class="navbar__hamburger" :class="{ 'is-open': isMobileOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Backdrop overlay -->
    <transition name="mobile-backdrop">
      <div
        v-if="isMobileOpen"
        class="navbar__mobile-backdrop"
        @click="isMobileOpen = false"
      ></div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="isMobileOpen" class="navbar__mobile-menu" id="nav-mobile-menu">
        <ul>
          <li v-for="link in navLinks" :key="link.to">
            <router-link
              :to="link.to"
              class="navbar__mobile-link"
              active-class="navbar__mobile-link--active"
              @click="isMobileOpen = false"
            >
              <span>{{ link.label }}</span>
              <ChevronLeft :size="16" class="navbar__mobile-arrow" />
            </router-link>
          </li>
        </ul>
        <div class="navbar__mobile-footer">
          <button
            type="button"
            class="navbar__theme-btn navbar__theme-btn--mobile"
            @click="toggleTheme"
          >
            <Sun v-if="isDark" :size="18" class="text-amber-400" />
            <Moon v-else :size="18" class="text-slate-700" />
            <span>{{ isDark ? 'حالت روشن' : 'حالت تاریک' }}</span>
          </button>
          <router-link to="/contact" class="navbar__cta navbar__cta--mobile" @click="isMobileOpen = false">
            تماس با ما
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDark, useWindowScroll } from '@vueuse/core'
import { Sun, Moon, PhoneCall, ChevronLeft, LogIn, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

interface NavLink {
  to: string
  label: string
  id: string
}

const navLinks: NavLink[] = [
  { to: '/', label: 'صفحه اصلی', id: 'home' },
  { to: '/forum', label: 'تالار گفتگو', id: 'forum' },
  { to: '/services', label: 'خدمات', id: 'services' },
  { to: '/team', label: 'تیم ما', id: 'team' },
  { to: '/contact', label: 'تماس با ما', id: 'contact' }
]

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: ''
})

function toggleTheme() {
  isDark.value = !isDark.value
}

const isMobileOpen = ref(false)
const route = useRoute()
const isForumPage = computed(() => route.path.startsWith('/forum'))

watch(() => route.path, () => {
  isMobileOpen.value = false
})

function toggleMobile() {
  isMobileOpen.value = !isMobileOpen.value
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  transition: background var(--transition-base), box-shadow var(--transition-base), backdrop-filter var(--transition-base);
}

.navbar--scrolled {
  background: hsla(0, 0%, 100%, 0.82);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  box-shadow: 0 1px 3px hsla(210, 20%, 10%, 0.08);
}

/* Mobile Open Navbar Header Background */
.navbar--mobile-open {
  background: hsla(215, 85%, 8%, 0.96) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid hsla(195, 70%, 50%, 0.18);
}

.navbar--scrolled.navbar--mobile-open:not(.navbar--dark) {
  background: hsla(0, 0%, 100%, 0.95) !important;
  border-bottom: 1px solid var(--color-neutral-200);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: hsla(0, 0%, 100%, 0.95);
  transition: color var(--transition-fast);
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.navbar--scrolled .navbar__logo {
  color: var(--color-primary-700);
}

.navbar__logo:hover {
  color: hsla(0, 0%, 100%, 1);
}

.navbar--scrolled .navbar__logo:hover {
  color: var(--color-primary-500);
}

.navbar__logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-xl);
  background: hsla(0, 0%, 100%, 0.12);
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  box-shadow: 0 2px 8px hsla(0, 0%, 0%, 0.1);
  transition: transform var(--transition-base), box-shadow var(--transition-base), background var(--transition-base), border-color var(--transition-base);
  flex-shrink: 0;
}

.navbar--scrolled .navbar__logo-icon {
  background: hsla(195, 70%, 50%, 0.08);
  border-color: hsla(195, 70%, 50%, 0.18);
  box-shadow: 0 2px 8px hsla(195, 65%, 42%, 0.08);
}

.navbar__logo:hover .navbar__logo-icon {
  transform: scale(1.05);
  box-shadow: 0 4px 14px hsla(0, 0%, 0%, 0.15);
}

.navbar--scrolled .navbar__logo:hover .navbar__logo-icon {
  box-shadow: 0 4px 14px hsla(195, 65%, 42%, 0.18);
}

/* Links */
.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.navbar__link {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: hsla(0, 0%, 100%, 0.85);
  transition: all var(--transition-fast);
  position: relative;
}

.navbar--scrolled .navbar__link {
  color: var(--color-neutral-600);
}

.navbar__link:hover {
  color: hsla(0, 0%, 100%, 1);
  background: hsla(0, 0%, 100%, 0.12);
}

.navbar--scrolled .navbar__link:hover {
  color: var(--color-primary-600);
  background: var(--color-primary-50);
}

.navbar__link--active {
  color: white;
  background: hsla(0, 0%, 100%, 0.18);
  font-weight: 600;
}

.navbar--scrolled .navbar__link--active {
  color: var(--color-primary-600);
  background: var(--color-primary-100);
}

/* Actions (Theme & CTA) */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.navbar__theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  background: hsla(0, 0%, 100%, 0.14);
  border: 1px solid hsla(0, 0%, 100%, 0.25);
  color: white;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.navbar--scrolled .navbar__theme-btn {
  background: hsla(210, 20%, 95%, 0.9);
  border-color: hsla(210, 15%, 85%, 0.8);
  color: var(--color-neutral-800);
}

.navbar__theme-btn:hover {
  transform: scale(1.05);
  background: hsla(0, 0%, 100%, 0.25);
}

.navbar--scrolled .navbar__theme-btn:hover {
  background: var(--color-primary-100);
}

.navbar__theme-btn--mobile {
  width: 100%;
  gap: var(--space-2);
  padding: var(--space-3);
  margin-bottom: var(--space-3);
  background: hsla(210, 20%, 95%, 0.8);
  border-color: hsla(210, 15%, 85%, 0.8);
  color: var(--color-neutral-800);
  font-weight: 500;
  font-size: var(--font-size-sm);
}

/* ============================================
   Dark Mode Navbar Styles (Unscrolled & Scrolled)
   ============================================ */
.navbar--dark,
:global(html.dark) .navbar {
  background: hsla(222, 34%, 13%, 0.88);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border-bottom: 1px solid hsla(222, 22%, 24%, 0.7);
  box-shadow: 0 4px 20px hsla(222, 50%, 5%, 0.35);
}

.navbar--dark .navbar__logo,
:global(html.dark) .navbar .navbar__logo {
  color: #f1f5f9;
}

.navbar--dark .navbar__logo:hover,
:global(html.dark) .navbar .navbar__logo:hover {
  color: #38bdf8;
}

.navbar--dark .navbar__logo-icon,
:global(html.dark) .navbar .navbar__logo-icon {
  background: hsla(195, 70%, 50%, 0.12);
  border: 1px solid hsla(195, 70%, 50%, 0.3);
  box-shadow: 0 0 16px hsla(195, 70%, 50%, 0.18);
}

.navbar--dark .navbar__logo:hover .navbar__logo-icon,
:global(html.dark) .navbar .navbar__logo:hover .navbar__logo-icon {
  transform: scale(1.05);
  box-shadow: 0 0 24px hsla(195, 70%, 50%, 0.35);
  border-color: hsla(195, 70%, 50%, 0.5);
}

.navbar--dark .navbar__link,
:global(html.dark) .navbar .navbar__link {
  color: hsl(215, 25%, 85%);
  font-weight: 500;
}

.navbar--dark .navbar__link:hover,
:global(html.dark) .navbar .navbar__link:hover {
  color: #38bdf8;
  background: hsla(195, 70%, 50%, 0.15);
}

.navbar--dark .navbar__link--active,
:global(html.dark) .navbar .navbar__link--active {
  color: #38bdf8;
  background: hsla(195, 70%, 50%, 0.22);
  border: 1px solid hsla(195, 70%, 50%, 0.35);
  box-shadow: 0 0 12px hsla(195, 70%, 50%, 0.15);
  font-weight: 600;
}

.navbar--dark .navbar__theme-btn,
:global(html.dark) .navbar .navbar__theme-btn {
  background: hsla(222, 28%, 22%, 0.9);
  border: 1px solid hsla(38, 90%, 55%, 0.45);
  color: #fbbf24;
  box-shadow: 0 0 14px hsla(38, 90%, 55%, 0.2);
}

.navbar--dark .navbar__theme-btn:hover,
:global(html.dark) .navbar .navbar__theme-btn:hover {
  background: hsla(38, 90%, 55%, 0.22);
  border-color: hsla(38, 90%, 55%, 0.7);
  box-shadow: 0 0 20px hsla(38, 90%, 55%, 0.4);
  transform: scale(1.08);
}

.navbar--dark .navbar__cta,
:global(html.dark) .navbar .navbar__cta {
  background: linear-gradient(135deg, hsl(195, 80%, 45%), hsl(170, 70%, 40%));
  border: 1px solid hsla(195, 70%, 60%, 0.35);
  color: #ffffff;
  box-shadow: 0 2px 14px hsla(195, 70%, 45%, 0.35);
}

.navbar--dark .navbar__cta:hover,
:global(html.dark) .navbar .navbar__cta:hover {
  background: linear-gradient(135deg, hsl(195, 85%, 48%), hsl(170, 75%, 42%));
  box-shadow: 0 4px 22px hsla(195, 70%, 45%, 0.55);
  transform: translateY(-1px);
}

.navbar--dark .navbar__hamburger span,
:global(html.dark) .navbar .navbar__hamburger span {
  background: #f1f5f9;
}

/* Dark mode Scrolled adjustments */
.navbar--dark.navbar--scrolled,
:global(html.dark) .navbar--scrolled {
  background: hsla(222, 34%, 11%, 0.95) !important;
  backdrop-filter: blur(20px) saturate(200%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(200%) !important;
  border-bottom: 1px solid hsla(195, 70%, 50%, 0.25) !important;
  box-shadow: 0 6px 24px hsla(222, 50%, 5%, 0.6) !important;
}

.navbar--dark.navbar--scrolled .navbar__logo,
:global(html.dark) .navbar--scrolled .navbar__logo {
  color: #38bdf8;
}

.navbar--dark.navbar--scrolled .navbar__link,
:global(html.dark) .navbar--scrolled .navbar__link {
  color: hsl(215, 25%, 85%);
}

.navbar--dark.navbar--scrolled .navbar__link:hover,
:global(html.dark) .navbar--scrolled .navbar__link:hover {
  color: #38bdf8;
  background: hsla(195, 70%, 50%, 0.16);
}

.navbar--dark.navbar--scrolled .navbar__link--active,
:global(html.dark) .navbar--scrolled .navbar__link--active {
  color: #38bdf8;
  background: hsla(195, 70%, 50%, 0.24);
  border-color: hsla(195, 70%, 50%, 0.4);
}

/* Dark mode Mobile Menu */
.navbar--dark.navbar--mobile-open,
:global(html.dark) .navbar.navbar--mobile-open,
:global(html.dark) .navbar--scrolled.navbar--mobile-open {
  background: hsla(222, 34%, 12%, 0.98) !important;
  border-bottom: 1px solid hsla(195, 70%, 50%, 0.25) !important;
}

.navbar--dark .navbar__mobile-menu,
:global(html.dark) .navbar__mobile-menu,
:global(html.dark) .navbar--scrolled .navbar__mobile-menu {
  background: hsla(222, 34%, 13%, 0.98) !important;
  border-bottom: 1px solid hsla(195, 70%, 50%, 0.25) !important;
  box-shadow: 0 20px 40px hsla(222, 50%, 5%, 0.7) !important;
}

.navbar--dark .navbar__mobile-link,
:global(html.dark) .navbar__mobile-link,
:global(html.dark) .navbar--scrolled .navbar__mobile-link {
  color: hsl(215, 25%, 85%) !important;
}

.navbar--dark .navbar__mobile-link:hover,
.navbar--dark .navbar__mobile-link--active,
:global(html.dark) .navbar__mobile-link:hover,
:global(html.dark) .navbar__mobile-link--active,
:global(html.dark) .navbar--scrolled .navbar__mobile-link:hover,
:global(html.dark) .navbar--scrolled .navbar__mobile-link--active {
  background: hsla(195, 80%, 50%, 0.16) !important;
  color: #38bdf8 !important;
  border-color: hsla(195, 80%, 50%, 0.3) !important;
}

.navbar--dark .navbar__theme-btn--mobile,
:global(html.dark) .navbar__theme-btn--mobile {
  background: hsla(222, 28%, 20%, 0.95) !important;
  border-color: hsla(38, 90%, 55%, 0.35) !important;
  color: #fbbf24 !important;
}

.navbar--dark .navbar__cta--mobile,
:global(html.dark) .navbar__cta--mobile,
:global(html.dark) .navbar--scrolled .navbar__cta--mobile {
  background: linear-gradient(135deg, hsl(195, 80%, 46%), hsl(170, 70%, 40%)) !important;
  box-shadow: 0 4px 18px hsla(195, 70%, 45%, 0.4) !important;
  border: 1px solid hsla(195, 70%, 60%, 0.35) !important;
  color: white !important;
}

.navbar__mobile-footer {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-neutral-200);
}

/* CTA */
.navbar__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  background: hsla(0, 0%, 100%, 0.18);
  border: 1px solid hsla(0, 0%, 100%, 0.3);
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: all var(--transition-base);
  box-shadow: 0 2px 8px hsla(0, 0%, 0%, 0.1);
}

.navbar--scrolled .navbar__cta {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
  border: none;
  box-shadow: 0 2px 8px hsla(195, 65%, 42%, 0.3);
}

.navbar__cta:hover {
  transform: translateY(-1px);
  background: hsla(0, 0%, 100%, 0.25);
  box-shadow: 0 4px 16px hsla(0, 0%, 0%, 0.15);
}

.navbar--scrolled .navbar__cta:hover {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
  box-shadow: 0 4px 16px hsla(195, 65%, 42%, 0.4);
}

/* Mobile Toggle */
.navbar__mobile-toggle {
  display: none;
  padding: var(--space-2);
  z-index: 10;
}

.navbar__hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.navbar__hamburger span {
  display: block;
  height: 2px;
  background: hsla(0, 0%, 100%, 0.9);
  border-radius: 2px;
  transition: all var(--transition-base);
  transform-origin: center;
}

.navbar--scrolled .navbar__hamburger span {
  background: var(--color-neutral-700);
}

.navbar__hamburger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar__hamburger.is-open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.navbar__hamburger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Backdrop */
.navbar__mobile-backdrop {
  position: fixed;
  inset: 0;
  top: var(--nav-height);
  background: hsla(215, 90%, 5%, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 998;
}

.mobile-backdrop-enter-active,
.mobile-backdrop-leave-active {
  transition: opacity var(--transition-base);
}
.mobile-backdrop-enter-from,
.mobile-backdrop-leave-to {
  opacity: 0;
}

/* Mobile Menu */
.navbar__mobile-menu {
  position: absolute;
  top: var(--nav-height);
  left: 0;
  right: 0;
  background: hsla(215, 85%, 8%, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: var(--space-6);
  border-bottom: 1px solid hsla(195, 70%, 50%, 0.22);
  box-shadow: 0 20px 40px hsla(215, 90%, 5%, 0.6), 0 0 25px hsla(195, 70%, 50%, 0.12);
  z-index: 999;
}

.navbar__mobile-menu ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.navbar__mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: 600;
  color: hsla(0, 0%, 100%, 0.88);
  transition: all var(--transition-fast);
  border: 1px solid transparent;
}

.navbar__mobile-arrow {
  opacity: 0.5;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.navbar__mobile-link:hover,
.navbar__mobile-link--active {
  background: hsla(195, 80%, 50%, 0.14);
  color: #38bdf8;
  border-color: hsla(195, 80%, 50%, 0.28);
}

.navbar__mobile-link:hover .navbar__mobile-arrow,
.navbar__mobile-link--active .navbar__mobile-arrow {
  opacity: 1;
  transform: translateX(-4px);
}

.navbar__cta--mobile {
  width: 100%;
  justify-content: center;
  padding: var(--space-3) var(--space-5);
  background: linear-gradient(135deg, var(--color-accent-400), var(--color-primary-500));
  color: white;
  border: 1px solid hsla(170, 70%, 50%, 0.3);
  font-weight: 700;
  box-shadow: 0 4px 18px hsla(170, 60%, 45%, 0.35);
}

.navbar__cta--mobile:hover {
  background: linear-gradient(135deg, var(--color-accent-400), var(--color-primary-500));
  box-shadow: 0 6px 24px hsla(170, 65%, 45%, 0.5);
}

/* Scrolled Mobile Menu Adaptations (Light mode only) */
:not(.navbar--dark).navbar--scrolled .navbar__mobile-menu {
  background: hsla(0, 0%, 100%, 0.96);
  border-bottom: 1px solid var(--color-neutral-200);
  box-shadow: var(--shadow-xl);
}

:not(.navbar--dark).navbar--scrolled .navbar__mobile-link {
  color: var(--color-neutral-700);
}

:not(.navbar--dark).navbar--scrolled .navbar__mobile-link:hover,
:not(.navbar--dark).navbar--scrolled .navbar__mobile-link--active {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  border-color: var(--color-primary-100);
}

:not(.navbar--dark).navbar--scrolled .navbar__cta--mobile {
  border: none;
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all var(--transition-base);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Auth Button & User Profile */
.navbar__auth-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: var(--font-size-xs);
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.navbar--scrolled .navbar__auth-btn {
  border-color: #cbd5e1;
  background: #f8fafc;
  color: #0f172a;
}

:global(html.dark) .navbar--scrolled .navbar__auth-btn {
  border-color: rgba(255, 255, 255, 0.15);
  background: #1e293b;
  color: #f1f5f9;
}

.navbar__auth-btn:hover {
  background: rgba(6, 182, 212, 0.2);
  border-color: #38bdf8;
  transform: translateY(-1px);
}

.navbar__user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar__user-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.65rem 0.25rem 0.35rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.navbar--scrolled .navbar__user-badge {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

:global(html.dark) .navbar--scrolled .navbar__user-badge {
  background: #1e293b;
  border-color: #334155;
}

.navbar__user-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.navbar__user-name {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: #ffffff;
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar--scrolled .navbar__user-name {
  color: #0f172a;
}

:global(html.dark) .navbar--scrolled .navbar__user-name {
  color: #f1f5f9;
}

.navbar__logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s;
}

.navbar__logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.05);
}
</style>

