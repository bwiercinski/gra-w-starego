<template>
    <div id="game-player-info">
        dupa
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import bContainer from 'bootstrap-vue/es/components/layout/container';
    import bCol from 'bootstrap-vue/es/components/layout/col';
    import bRow from 'bootstrap-vue/es/components/layout/row';

    @Component({
        name: "game-player-info",
        components: {
            'b-container': bContainer,
            'b-col': bCol,
            'b-row': bRow
        }
    })
    export default class GamePlayerInfo extends Vue {
    }
</script>

<style lang="scss">
    #game-player-info {
    }
</style>
