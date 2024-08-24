import { createApp } from "vue";
import "./style.css";
import "vant/lib/index.css";
import router from "./router/index.ts";
import App from "./App.vue";
import Vant from "vant";
import { Lazyload } from 'vant';

const app = createApp(App);
app.use(Vant);
app.use(router);
app.use(Lazyload);
app.mount("#app");

