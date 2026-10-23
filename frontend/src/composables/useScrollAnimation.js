import { onMounted, onUnmounted } from 'vue'

/**
 * Composable that provides IntersectionObserver-based scroll animation
 * fallback for browsers that don't support CSS scroll-driven animations.
 */
export function useScrollAnimation() {
  let observer = null

  onMounted(() => {
    // Only apply JS fallback if CSS scroll-driven animations are NOT supported
    if (CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            entry.target.classList.add('animate-on-scroll-js')
            observer.unobserve(entry.target)
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Add fallback class and observe all elements
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('animate-on-scroll-js')
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
