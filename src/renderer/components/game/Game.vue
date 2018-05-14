<template>
    <b-container id="game" fluid class="flex-lg-fill-1">
        <b-row style="height: 100%;">
            <b-col style="height: 100%;">
                <b-row style="height: 80%;">
                    <b-col cols="12" md="4">
                        <b-row>
                            hello
                        </b-row>
                    </b-col>
                    <b-col cols="12" md="8" style="height: 100%;">
                        <b-row style="height: 100%;">
                            <div style="margin: auto;">
                                <div class="g-box" :style="{'--size': size}">
                                    <div class="g-content">
                                        <div class="g-row" v-for="i in size">
                                            <div v-for="j in size"
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
                </b-row>
                <b-row style="height: 20%; background: red">
                    hello
                    {{date1}}
                    {{date2}}
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import bContainer from 'bootstrap-vue/es/components/layout/container'
    import bCol from 'bootstrap-vue/es/components/layout/col'
    import bRow from 'bootstrap-vue/es/components/layout/row'
    import {ipcRenderer} from 'electron';

    @Component({
        name: "game",
        components: {
            'b-container': bContainer,
            'b-col': bCol,
            'b-row': bRow
        }
    })
    export default class Game extends Vue {
        size = 5;
        angleArray: string[][] = this.createAngleArray(this.size);

        mounted() {
            this.$nextTick(() => {
            });
        }


        date1 = 0;
        date2 = 0;

        onChessboardClick(i: number, j: number): void {
            [i, j] = [--i, --j];
            console.log('chess', i, j);
            console.log('chess', i + 7);

            let start = +new Date();
            console.log(this.rec(0, 4));
            this.date1 = +new Date() - start;
            console.log('chess1', this.date1);

            start = +new Date();
            console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
            this.date2 = +new Date() - start;
            console.log('chess2', this.date2);

            start = +new Date();
            ipcRenderer.removeAllListeners('asynchronous-reply');
            ipcRenderer.on('asynchronous-reply', (event, arg) => {
                this.date2 = +new Date() - start;
                console.log('chess2', this.date2);
            });
            ipcRenderer.send('asynchronous-message', 'ping');

            console.log('done');

        }


        rec(counter: number, size: number): number {
            let a = 0;
            if (counter < size) {
                for (let i = 0; i < 100; i++) {
                    if (counter < size) {
                        a = 1 + this.rec(counter + 1, size);
                    } else {
                        return 0;
                    }
                }
            }
            return a;
        }

        createAngleArray(size): string[][] {
            console.log('now')
            return Array.from({length: size}, () => Array.from({length: size}, this.randomAngle));
        };

        randomAngle = () => Math.floor(Math.random() * 2) * 180 + 'deg'
    }
</script>

<style lang="scss">
    #game {
        background: url("~@/assets/bg-tavern.png") no-repeat center;
        background-size: cover;

        .g-box {
            position: relative;
            width: 60vmin;
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

    @media (min-width: 768px) {
        .flex-lg-fill-1 {
            flex: 1;
        }
    }

    @media (max-width: 768px) {
        .g-box {
            margin-bottom: 50px;
        }
    }
</style>
