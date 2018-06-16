import Vue from "vue";
import electron from "vue-electron";
import App from "./App.vue";
import VueRouter from "./router";

if (!process.env.IS_WEB) { Vue.use(electron); }
Vue.config.productionTip = false;

/* tslint:disable:no-unused-expression */
new Vue({
    components: {App},
    el: "#app",
    router: VueRouter,
    render(createElement: any) {
        return createElement(App);
    },
});
/* tslint:enable:no-unused-expression */
