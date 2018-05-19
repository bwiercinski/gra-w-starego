<template>
    <div id="app" class="d-flex flex-column">
        <navbar v-show="$route.path === '/game'"></navbar>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Navbar from './components/Navbar.vue';
    import {AbstractComponent} from "./components/abstract-component";

    @Component({
        name: "app",
        components: {
            'navbar': Navbar
        }
    })
    export default class App extends AbstractComponent {
    }
</script>

<style lang="scss">
    @import './assets/main.scss';

    #app {
        width: 100%;
        height: 100%;
    }
</style>
