import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from "../components/LandingPage.vue";
import Game from "../components/game/Game.vue";
import GameSetup from "../components/game/GameSetup.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {path: '/', redirect: '/game-setup'},
        {path: '/game', name: 'game', component: Game},
        {path: '/game-setup', name: 'game-setup', component: GameSetup},
        {path: '/start', name: 'landing-page', component: LandingPage},
        {path: '*', redirect: '/game'}
    ]
})
