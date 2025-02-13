import './assets/refereesite.css'
import './assets/games.css'
import './assets/standings.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
