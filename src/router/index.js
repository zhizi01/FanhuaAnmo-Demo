import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/door',
  },
  {
    path: '/door',
    name: 'DoorHome',
    component: () => import('@/views/door/DoorHome.vue'),
    meta: { tab: 0, title: '上门按摩' },
  },
  {
    path: '/door/therapists',
    name: 'TherapistList',
    component: () => import('@/views/door/TherapistList.vue'),
    meta: { hideTabBar: true, title: '选择技师' },
  },
  {
    path: '/door/therapist/:id',
    name: 'TherapistDetail',
    component: () => import('@/views/door/TherapistDetail.vue'),
    meta: { hideTabBar: true, title: '技师主页' },
  },
  {
    path: '/store',
    name: 'StoreList',
    component: () => import('@/views/store/StoreList.vue'),
    meta: { tab: 1, title: '到店按摩' },
  },
  {
    path: '/store/:id',
    name: 'StoreDetail',
    component: () => import('@/views/store/StoreDetail.vue'),
    meta: { hideTabBar: true, title: '门店详情' },
  },
  {
    path: '/me',
    name: 'Profile',
    component: () => import('@/views/me/Profile.vue'),
    meta: { tab: 2, title: '个人中心' },
  },
  {
    path: '/me/login',
    name: 'Login',
    component: () => import('@/views/me/Login.vue'),
    meta: { hideTabBar: true, title: '登录' },
  },
  {
    path: '/me/orders',
    name: 'Orders',
    component: () => import('@/views/me/Orders.vue'),
    meta: { hideTabBar: true, title: '订单历史' },
  },
  {
    path: '/me/favorites',
    name: 'Favorites',
    component: () => import('@/views/me/Favorites.vue'),
    meta: { hideTabBar: true, title: '收藏中心' },
  },
  {
    path: '/me/privacy',
    name: 'Privacy',
    component: () => import('@/views/me/PlaceholderPage.vue'),
    meta: { hideTabBar: true, title: '隐私协议' },
  },
  {
    path: '/me/service',
    name: 'ServiceAgreement',
    component: () => import('@/views/me/PlaceholderPage.vue'),
    meta: { hideTabBar: true, title: '服务协议' },
  },
  {
    path: '/me/complaint',
    name: 'Complaint',
    component: () => import('@/views/me/PlaceholderPage.vue'),
    meta: { hideTabBar: true, title: '投诉违规' },
  },
  {
    path: '/me/about',
    name: 'About',
    component: () => import('@/views/me/PlaceholderPage.vue'),
    meta: { hideTabBar: true, title: '关于我们' },
  },
  {
    path: '/me/merchant-join',
    name: 'MerchantJoin',
    component: () => import('@/views/me/PlaceholderPage.vue'),
    meta: { hideTabBar: true, title: '商户入驻' },
  },
  {
    path: '/me/therapist-join',
    name: 'TherapistJoin',
    component: () => import('@/views/me/PlaceholderPage.vue'),
    meta: { hideTabBar: true, title: '技师入驻' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
