<template>
    <div id="landing-page">
        <div class="landing-background"></div>
        <div class="cover">
            <h1>Gra w starego</h1>
            <h2>Rozwali jak młodego</h2>
            <b-button size="lg" variant="primary" to="/game-setup">Grajmy</b-button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import bButton from 'bootstrap-vue/es/components/button/button'

    @Component({
        name: "landing-page",
        components: {
            'b-button': bButton
        }
    })
    export default class LandingPage extends Vue {
    }
</script>

<style lang="scss">
    #landing-page {
        background: url("~@/assets/bg-village.png") no-repeat center bottom;
        background-size: cover;
        height: 100%;
        .landing-background {
            background: url("~@/assets/bg-oldman.png") no-repeat center bottom;
            background-size: contain;
            position: fixed;
            left: 40%;
            right: 5%;
            bottom: 0;
            height: 70%;
        }
        .cover {
            position: fixed;
            height: 40%;
            left: 10%;
            right: 10%;
            top: 20%;
            text-align: center;
            h1 {
                font-size: 11vh;
            }
            h2 {
                font-size: 4vh;
                margin-bottom: 10vh;
            }
        }
    }
</style>
