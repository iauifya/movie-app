import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/result/:search',
    name: 'result',
    component: () => import(/* webpackChunkName: "about" */ '../views/searchView.vue')
  },
  {
    path: '/nowlist',
    name: 'nowlist',
    component: () => import(/* webpackChunkName: "about" */ '../views/nowlistView.vue')
  },
  {
    path: '/cominglist',
    name: 'cominglist',
    component: () => import(/* webpackChunkName: "about" */ '../views/cominglistView.vue')
  },
  {
    path: '/popularlist',
    name: 'popularlist',
    component: () => import(/* webpackChunkName: "about" */ '../views/popularlistView.vue')
  },
  {
    path: '/movieinfo/:id',
    name: 'movieinfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/movieinfoView.vue')
  },
  //{
    // path: '/about',
    // name: 'about',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
