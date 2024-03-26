import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueHammer } from 'vue2-hammer'

createApp(App).use(VueHammer).mount('#app')
