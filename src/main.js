import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import {router} from './router'
import './style.css'
import App from './App.vue'

import "./permission"

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)

app.use(router)

app.use(store)

import 'nprogress/nprogress.css'

// import permission from './directives/permission'
// app.use(permission)


app.mount('#app')