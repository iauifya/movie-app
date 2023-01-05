import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import "video.js/dist/video-js.css";

createApp(App).use(store).use(router).use(VueAxios,axios).mount('#app')
