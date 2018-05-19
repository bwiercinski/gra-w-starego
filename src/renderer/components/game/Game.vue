<template>
    <b-container id="game" fluid style="flex: 1;">
        <b-row style="height: 100%;">
            <b-col style="height: 100%;">
                <b-row style="height: 100%;">
                    <b-col cols="3">
                        <b-row>
                            <game-player-info :player="anyPlayer(0)"
                                              :playerMove="ss(gameState, 'nextPlayer') === 0"></game-player-info>
                        </b-row>
                    </b-col>
                    <b-col cols="6" style="height: 100%;">
                        <b-row style="height: 100%;">
                            <div style="margin: auto;">
                                <div class="g-box" :style="{'--size': ss(gameConfig, 'size', 0)}">
                                    <div class="g-content">
                                        <div class="g-row" v-for="i in ss(gameConfig, 'size', 0)">
                                            <div v-for="j in ss(gameConfig, 'size', 0)"
                                                 :class="['g-cell', (i + j) % 2 === 0 ? 'g-even' : 'g-odd']"
                                                 :style="{'--rotate': angleArray && angleArray[i] && angleArray[i][j]}"
                                                 v-on:click="onChessboardClick(i, j)">
                                                <span>6</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-row>
                    </b-col>
                    <b-col cols="3">
                        <b-row>
                            <game-player-info :player="anyPlayer(1)"
                                              :playerMove="ss(gameState, 'nextPlayer') === 1"></game-player-info>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import bContainer from 'bootstrap-vue/es/components/layout/container';
    import bCol from 'bootstrap-vue/es/components/layout/col';
    import bRow from 'bootstrap-vue/es/components/layout/row';
    import gamePlayerInfo from './GamePlayerInfo'
    import {ipcRenderer} from 'electron';
    import {IpcMessage, IpcMessageType} from "../../../model/messages";
    import {GameConfig, GameState} from "../../../model/model";
    import {AbstractComponent} from "../abstract-component";

    @Component({
        name: "game",
        components: {
            'b-container': bContainer,
            'b-col': bCol,
            'b-row': bRow,
            'game-player-info': gamePlayerInfo
        }
    })
    export default class Game extends AbstractComponent {

        // ui
        angleArray: string[][];

        // game
        gameConfig: GameConfig = null;
        gameState: GameState = null;

        constructor() {
            super();

            ipcRenderer.removeAllListeners(IpcMessage.GAME_CONFIG + IpcMessageType.RESPONSE);
            ipcRenderer.on(IpcMessage.GAME_CONFIG + IpcMessageType.RESPONSE, (event, gameConfig: GameConfig) => {
                console.log('GAME_CONFIG RESPONSE', gameConfig);
                this.$nextTick(() => this.initGame(gameConfig))
            });
            ipcRenderer.send(IpcMessage.GAME_CONFIG + IpcMessageType.REQUEST);
        }

        initGame(gameConfig: GameConfig) {
            this.gameConfig = gameConfig;
            this.angleArray = this.createAngleArray(this.ss(gameConfig, 'size', 0));
        }

        onChessboardClick(i: number, j: number): void {
            [i, j] = [--i, --j];
        }

        createAngleArray = (size: number) => Array.from({length: size}, () => Array.from({length: size}, this.randomAngle));

        randomAngle = () => Math.floor(Math.random() * 2) * 180 + 'deg';

        anyPlayer(index: number) {
            let players = this.ss(this.gameState, 'players') || this.ss(this.gameConfig, 'players');
            return this.ss(players, index.toString(), null);
        }
    }
</script>

<style lang="scss">
    #game {
        background: url("~@/assets/bg-tavern.png") no-repeat center;
        background-size: cover;

        .g-box {
            position: relative;
            width: 45vw;
            max-width: 80vh;
            overflow: hidden;
            background: url("~@/assets/bg-frame.png") no-repeat center;
            filter: drop-shadow(0.5vmin 0.5vmin 2.5vmin rgba(0, 0, 0, 0.5));
            background-size: cover;

            --size: 10;

            &:before {
                content: "";
                display: block;
                padding-top: 100%;
            }

            .g-content {
                background: url("~@/assets/bg-odd.png") no-repeat center bottom;
                background-size: cover;
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 4vmin;
                left: 4vmin;
                right: 4vmin;
                bottom: 4vmin;
                box-shadow: 0 0 2vmin 0.4vmin #724636;

                .g-row {
                    display: flex;
                    width: 100%;
                    flex: 1;
                    .g-cell {
                        display: flex;
                        float: left;
                        height: 100%;
                        flex: 1;
                        --rotate: 0;

                        &.g-even {
                            background: url("~@/assets/bg-even.png") no-repeat center bottom;
                            background-size: cover;
                            transform: rotate(var(--rotate));
                        }

                        &.g-odd {
                            background: url("~@/assets/bg-odd.png") no-repeat center bottom;
                            background-size: cover;
                            transform: rotate(var(--rotate));
                        }

                        span {
                            display: block;
                            margin: auto;
                            transform: rotate(calc(-1 * var(--rotate)));
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }

    /*@media (min-width: 768px) {
        .flex-lg-fill-1 {
            flex: 1;
        }
    }

    @media (max-width: 768px) {
        .g-box {
            margin-bottom: 50px;
        }
    }*/
</style>
