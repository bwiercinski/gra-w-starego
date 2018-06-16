<template>
    <b-container id="game" fluid style="flex: 1;">
        <b-row style="height: 100%;">
            <b-col style="height: 100%;">
                <b-row style="height: 100%;">
                    <b-col cols="3">
                        <b-row style="height: 100%;">
                            <game-player-info :playerIndex="0" :player="anyPlayer(0)"
                                              :playerMove="ss(gameState, 'nextPlayer') === 0"></game-player-info>
                        </b-row>
                    </b-col>
                    <b-col cols="6" style="height: 100%;">
                        <b-row style="height: calc(100% - 75px);">
                            <div style="margin: auto;">
                                <game-chessboard :gameState="gameState"
                                                 v-on:onChessboardClick="onChessboardClick"></game-chessboard>
                            </div>
                        </b-row>
                        <b-row style="height: 75px; text-align: center;">
                            <div style="margin: auto;">
                                <b-button variant="primary" to="/start">Starczy</b-button>
                            </div>
                        </b-row>
                    </b-col>
                    <b-col cols="3">
                        <b-row style="height: 100%;">
                            <game-player-info :playerIndex="1" :player="anyPlayer(1)"
                                              :playerMove="ss(gameState, 'nextPlayer') === 1"></game-player-info>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import bButton from 'bootstrap-vue/es/components/button/button';
    import bContainer from 'bootstrap-vue/es/components/layout/container';
    import bCol from 'bootstrap-vue/es/components/layout/col';
    import bRow from 'bootstrap-vue/es/components/layout/row';
    import gameChessboard from './GameChessboard'
    import gamePlayerInfo from './GamePlayerInfo'
    import {ipcRenderer} from 'electron';
    import {IpcMessage, IpcMessageType} from "../../../model/messages";
    import {IPlayer, IBoardPosition} from "../../../model/model";
    import {AbstractComponent} from "../abstract-component";
    import {GameState} from "../../../model/game-state";
    import {PlayerTurnMessage} from "../../../model/player-turn-message";
    import {MoveMadeMessage} from "../../../model/move-made-message";

    @Component({
        name: "game",
        components: {
            'b-button': bButton,
            'b-container': bContainer,
            'b-col': bCol,
            'b-row': bRow,
            'game-chessboard': gameChessboard,
            'game-player-info': gamePlayerInfo
        }
    })
    export default class Game extends AbstractComponent {

        // game
        gameState: GameState = null;
        nextHumanPlayerIndex: number = -1;

        constructor() {
            super();

            this.addIpcListener(IpcMessage.GAME_STATE, (event, gameState: GameState) => {
                console.log('GAME_STATE RESPONSE', gameState);
                this.initGame(gameState);
            });

            this.addIpcListener(IpcMessage.PLAYER_TURN, (event, playerTurnMessage: PlayerTurnMessage) => {
                console.log('PLAYER_TURN RESPONSE', playerTurnMessage);
                this.setNextHumanPlayerIndex(playerTurnMessage.playerIndex);
            });

            ipcRenderer.send(IpcMessage.GAME_STATE + IpcMessageType.REQUEST);
        }

        destroyed() {
            this.$nextTick(() => {
                ipcRenderer.send(IpcMessage.STOP_GAME + IpcMessageType.REQUEST);
            })
        }

        initGame(gameState: GameState) {
            this.gameState = gameState;
        }

        setNextHumanPlayerIndex(nextHumanPlayerIndex: number) {
            this.nextHumanPlayerIndex = nextHumanPlayerIndex;
        }

        onChessboardClick(row: number, column: number): void {
            let position: IBoardPosition = {row: row, column: column};
            console.log(position, this.nextHumanPlayerIndex);
            ipcRenderer.send(IpcMessage.PLAYER_TURN + IpcMessageType.REQUEST,
                new MoveMadeMessage(position, this.nextHumanPlayerIndex));
        }

        anyPlayer(index: number): IPlayer {
            return this.ss(this.gameState, 'players[].' + index, null);
        }
    }
</script>

<style lang="scss">
    #game {
        background: url("~@/assets/bg-tavern.png") no-repeat center;
        background-size: cover;
    }
</style>
