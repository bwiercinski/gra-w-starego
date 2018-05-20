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
                                <game-chessboard :gameState="gameState"
                                                 v-on:onChessboardClick="onChessboardClick"></game-chessboard>
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
    import Component from 'vue-class-component';
    import bContainer from 'bootstrap-vue/es/components/layout/container';
    import bCol from 'bootstrap-vue/es/components/layout/col';
    import bRow from 'bootstrap-vue/es/components/layout/row';
    import gameChessboard from './GameChessboard'
    import gamePlayerInfo from './GamePlayerInfo'
    import {ipcRenderer} from 'electron';
    import {IpcMessage, IpcMessageType, MoveMadeMessage, PlayerTurnMessage} from "../../../model/messages";
    import {GameState, Player, Position} from "../../../model/model";
    import {AbstractComponent} from "../abstract-component";

    @Component({
        name: "game",
        components: {
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
            let position: Position = {row: row, column: column};
            console.log(position, this.nextHumanPlayerIndex);
            ipcRenderer.send(IpcMessage.PLAYER_TURN + IpcMessageType.REQUEST, new MoveMadeMessage
            (position, this.nextHumanPlayerIndex));
        }

        anyPlayer(index: number): Player {
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
