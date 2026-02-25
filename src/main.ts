import './assets/main.css'
// Import Swiper styles
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import VueApexCharts from 'vue3-apexcharts'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.$subscribe((mutation) => {
        console.log(`[${store.$id}]`, mutation)
    })
})

app.use(router)
app.use(pinia)
app.use(Vue3Toastify, {
    position: 'top-right',
    autoClose: 500,
    style: { zIndex: 100001, paddingTop: '16px', paddingRight: '16px', paddingLeft: '16px' }
} as ToastContainerOptions)

app.use(VueQueryPlugin)
app.use(VueApexCharts)

app.mount('#app')
