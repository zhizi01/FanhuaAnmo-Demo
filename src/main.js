import { createApp } from 'vue'
import 'vant/lib/index.css'
import './styles/app.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
