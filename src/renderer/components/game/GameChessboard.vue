<template>
    <div id="game-chessboard" class="g-box" :style="{'--size': ss(gameState, 'size', 0)}">
        <div class="g-content">
            <div class="g-row" v-for="i in ss(gameState, 'size', 0)">
                <div v-for="j in ss(gameState, 'size', 0)"
                     :class="['g-cell', (i + j) % 2 === 0 ? 'g-even' : 'g-odd']"
                     :style="{'--rotate': angleArray && angleArray[i] && angleArray[i][j]}"
                     v-on:click="$emit('onChessboardClick', i - 1, j - 1)">
                    <img v-show="boardValue(i, j)" :src="boardValue(i, j)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import {Prop, Watch} from 'vue-property-decorator';
    import {GameState} from "../../../model/model";
    import {AbstractComponent} from "../abstract-component";
    const pawnOld = require('../../assets/pawn-old.png');
    const pawnYoung = require('../../assets/pawn-young.png');

    @Component({
        name: "game-chessboard"
    })
    export default class GameChessboard extends AbstractComponent {

        // ui
        angleArray: string[][];
        size = -1;

        // game
        @Prop([GameState, Object])
        gameState: GameState;

        @Watch('gameState')
        pathChanged(gameState: GameState) {
            let size = this.ss(gameState, 'size', 0);
            if (size != this.size) {
                this.size = size;
                this.angleArray = this.createAngleArray(this.size);
            }
        }

        createAngleArray = (size: number) => Array.from({length: size}, () => Array.from({length: size}, this.randomAngle));

        randomAngle = () => Math.floor(Math.random() * 2) * 180 + 'deg';

        boardValue(row: number, column: number):string {
            let board: number[][] = this.ss(this.gameState, 'board.board', null);
            let playerIndex = board ? board[row - 1][column - 1] : -1;
            switch (playerIndex) {
                case 0:
                    return pawnOld;
                case 1:
                    return pawnYoung;
                default:
                    return null;
            }
        }
    }
</script>

<style lang="scss">
    #game-chessboard {

        &.g-box {
            position: relative;
            width: 45vw;
            max-width: 80vh;
            overflow: hidden;
            background: url("~@/assets/bg-frame.png") no-repeat center;
            background-size: cover;
            filter: drop-shadow(0.5vmin 0.5vmin 2.5vmin rgba(0, 0, 0, 0.5));

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

                        img {
                            display: block;
                            margin: auto;
                            transform: rotate(calc(-1 * var(--rotate)));
                            font-weight: bold;
                            width: 80%;
                            height: 80%;
                        }
                    }
                }
            }
        }
    }
</style>
