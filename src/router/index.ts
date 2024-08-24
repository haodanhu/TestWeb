import { createWebHashHistory, createRouter } from 'vue-router'

import Game1 from '../components/Game1.vue'
import App from '../App.vue'

const routes = [
    { path: '/', component: App },
    { path: '/Game1', component: Game1 },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router