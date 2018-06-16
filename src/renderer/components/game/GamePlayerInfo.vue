<template>
    <b-col id="game-player-info">
        <h3 class="center-header" style="margin: 10px 0;">{{ss(player, 'name', 'Bezimienny')}}</h3>
        <div :class="['avatar', playerMove ? 'active' : 'dis-active']">
            <div class="frame-holder"></div>
            <div :class="['avatar-holder', playerIndex === 0 ? 'old-holder' : 'young-holder']"></div>
        </div>
        <h5 class="center-header">Player points:</h5>
        <h3 class="center-header"><u>{{ss(player, 'playerPoints', -1)}}</u></h3>
    </b-col>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import bContainer from 'bootstrap-vue/es/components/layout/container';
    import bCol from 'bootstrap-vue/es/components/layout/col';
    import bRow from 'bootstrap-vue/es/components/layout/row';
    import {IPlayer} from "../../../model/model";
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
        playerIndex: number;

        @Prop()
        player: IPlayer;

        @Prop()
        playerMove: boolean;
    }
</script>

<style lang="scss">
    #game-player-info {
        .avatar {
            margin: 15% auto;
            width: 90%;
            height: 40%;
            position: relative;

            &.active {
                filter: drop-shadow(0 0 3.5vmin rgba(255, 192, 0, 0.8));
            }

            &.dis-active {
                filter: drop-shadow(0 0 3.5vmin rgba(0, 0, 0, 0.8));
            }

            div {
                position: absolute;
            }

            .frame-holder {
                background: url("~@/assets/frame.png") no-repeat center;
                background-size: contain;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2;
            }

            .avatar-holder {
                top: 10%;
                left: 10%;
                width: 80%;
                height: 80%;
                z-index: 1;
            }

            .old-holder {
                background: url("~@/assets/old-man.png") no-repeat center;
                background-size: contain;
            }

            .young-holder {
                background: url("~@/assets/young-man.png") no-repeat center;
                background-size: contain;
                transform: scaleX(-1);
            }
        }
    }
</style>
