import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import {install} from '@icon-park/vue-next/es/all';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
install(app);
install(app, 'i');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
