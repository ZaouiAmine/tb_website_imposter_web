import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/room/:code', name: 'Room', component: () => import('../views/Room.vue') },
  { path: '/game/:code', name: 'Game', component: () => import('../views/Game.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
