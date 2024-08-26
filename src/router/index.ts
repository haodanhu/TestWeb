import { createWebHashHistory, createRouter } from 'vue-router'

import Game from '../components/Game.vue'
import App from '../App.vue'

const routes = [
    { path: '/', component: App },
    { path: '/Game', component: Game },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router