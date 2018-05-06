import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from "../components/LandingPage.vue";
import Game from "../components/game/Game.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {path: '/', redirect: '/game'},
        {path: '/game', name: 'game', component: Game},
        {path: '/start', name: 'landing-page', component: LandingPage},
        {path: '*', redirect: '/game'}
    ]
})
