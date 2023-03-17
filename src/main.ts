import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

// 引入element-plus及图标
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// element-plus的中文设置（默认英文）
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
// element-plus图标全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(ElementPlus, { locale: zhCn })
  .use(store, key)
  .use(router)
  .mount("#app");
