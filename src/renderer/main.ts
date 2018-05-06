import App from "./App.vue";
import Vue from "vue";
import VueRouter from "./router";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {App},
    router: VueRouter,
    render(createElement: any) {
        return createElement(App);
    }
});
