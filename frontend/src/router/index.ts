import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/ServicesView.vue'
import TeamView from '../views/TeamView.vue'
import ContactView from '../views/ContactView.vue'
import ForumView from '../views/ForumView.vue'
import PostDetailView from '../views/PostDetailView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'مشاوره خرید لپتاپ' }
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView,
    meta: { title: 'تالار گفتگو و پرسش و پاسخ - مشاوره خرید لپتاپ' }
  },
  {
    path: '/forum/:id',
    name: 'post-detail',
    component: PostDetailView,
    meta: { title: 'مشاهده پرسش - مشاوره خرید لپتاپ' }
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    meta: { title: 'مشاوره خرید لپتاپ - خدمات' }
  },
  {
    path: '/team',
    name: 'team',
    component: TeamView,
    meta: { title: 'مشاوره خرید لپتاپ - تیم ما' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'مشاوره خرید لپتاپ - تماس با ما' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || 'مشاوره خرید لپتاپ'
})

export default router
