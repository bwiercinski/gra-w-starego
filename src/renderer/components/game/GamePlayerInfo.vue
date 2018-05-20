<template>
    <b-col id="game-player-info">
        <h3 class="center-header" style="margin: 10px 0;">{{ss(player, 'name', 'Bezimienny')}}</h3>
        <p>Player points: {{ss(player, 'playerPoints', -1)}}</p>
        <p>Player move: {{playerMove}}</p>
    </b-col>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import bContainer from 'bootstrap-vue/es/components/layout/container';
    import bCol from 'bootstrap-vue/es/components/layout/col';
    import bRow from 'bootstrap-vue/es/components/layout/row';
    import {Player} from "../../../model/model";
    import {AbstractComponent} from "../abstract-component";

    @Component({
        name: "game-player-info",
        components: {
            'b-container': bContainer,
            'b-col': bCol,
            'b-row': bRow
        }
    })
    export default class GamePlayerInfo extends AbstractComponent {

        @Prop()
        player: Player;

        @Prop()
        playerMove: boolean;
    }
</script>

<style lang="scss">
    #game-player-info {
    }
</style>
