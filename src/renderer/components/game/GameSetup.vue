<template>
    <b-container id="game-setup" fluid class="flex-lg-fill-1">
        <b-row>
            <b-col class="player-avatar old-man"></b-col>
            <b-col class="col animated-col bg-checkers"
                   :style="{'flex': '0 0 ' + middleColumnWidth + '%',
                   'max-width': middleColumnWidth + '%',
                   'padding' : '0'}">
                <div style="width: 100%; overflow: hidden;">
                    <div style="display: inline-block; position: relative; right: -50%;">
                        <div style="position: relative; left: -50%; padding: 10% 0;">
                            <b-form @submit.prevent="showModal = false" @submit="onSubmit" style="width: 45vw;">

                                <b-row>
                                    <h1 class="center-header">Przygotuj się!</h1>
                                </b-row>

                                <b-row>

                                    <b-col>
                                        <h3 class="center-header">Stary</h3>
                                        <b-form-group id="player0TypeGroup" label="Rodzaj gracza"
                                                      label-for="player0Type">
                                            <b-form-select id="player0Type" :options="oldmanPlayers" required
                                                           v-model="form.player0Type">
                                            </b-form-select>
                                        </b-form-group>
                                        <b-form-group id="player0NameGroup" label="Nazwa" label-for="player0Name">
                                            <b-form-input id="player0Name" type="text" required
                                                          v-model="form.player0Name">
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>

                                    <b-col>
                                        <h3 class="center-header">Młody</h3>
                                        <b-form-group id="player1TypeGroup" label="Rodzaj gracza"
                                                      label-for="player1Type">
                                            <b-form-select id="player1Type" :options="youngmanPlayers" required
                                                           v-model="form.player1Type">
                                            </b-form-select>
                                        </b-form-group>
                                        <b-form-group id="player2NameGroup" label="Nazwa" label-for="player1Name">
                                            <b-form-input id="player1Name" type="text" required
                                                          v-model="form.player1Name">
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>

                                </b-row>

                                <b-row>
                                    <b-col>
                                        <b-form-group id="sizeGroup" label="Rozmiar" label-for="size">
                                            <b-form-input id="size" type="number" v-model="form.size">
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col class="center-header">
                                        <b-button type="submit" variant="primary">Start!</b-button>
                                    </b-col>
                                </b-row>

                            </b-form>
                        </div>
                    </div>
                </div>

            </b-col>
            <b-col class="player-avatar young-man"></b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import bButton from 'bootstrap-vue/es/components/button/button';
    import bContainer from 'bootstrap-vue/es/components/layout/container';
    import bCol from 'bootstrap-vue/es/components/layout/col';
    import bForm from 'bootstrap-vue/es/components/form/form';
    import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox';
    import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group';
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
    import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
    import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select';
    import bRow from 'bootstrap-vue/es/components/layout/row';
    import {GameConfig, PlayerType} from "../../../model/model";
    import {randomArrayElement} from "../../../common/utils";
    import {ipcRenderer} from 'electron';
    import {IpcMessage, IpcMessageType} from "../../../model/messages";
    import {AbstractComponent} from "../abstract-component";

    export const oldmanSynonims = ['Stary', 'Senior', 'Starzec', 'Dziadek', 'Mędrzec', 'Przodek', 'Nestor', 'Matuzal'];
    export const youngmanSynonims = ['Młody', 'Junior', 'Dzieciak', 'Chłopyszek', 'Gówniarz', 'Małolat', 'Smarkacz', 'Szczyl'];

    @Component({
        name: "game-setup",
        components: {
            'b-button': bButton,
            'b-container': bContainer,
            'b-col': bCol,
            'b-form': bForm,
            'b-form-checkbox': bFormCheckbox,
            'b-form-checkbox-group': bFormCheckboxGroup,
            'b-form-group': bFormGroup,
            'b-form-input': bFormInput,
            'b-form-select': bFormSelect,
            'b-row': bRow
        }
    })
    export default class GameSetup extends AbstractComponent {
        form = {
            player0Type: -1,
            player0Name: randomArrayElement(oldmanSynonims),
            player1Type: -1,
            player1Name: randomArrayElement(youngmanSynonims),
            size: 8
        };
        oldmanPlayers: object[];
        youngmanPlayers: object[];

        middleColumnWidth = 50;

        constructor() {
            super();

            let botPlayers = [
                {text: 'Minmax', value: PlayerType.MINMAX},
                {text: 'Minmax AlfaBeta', value: PlayerType.MINMAX_AB},
                {text: 'Losowy', value: PlayerType.RANDOM},
                {text: 'HEURISTICS_DIFF_LDO', value: PlayerType.HEURISTICS_DIFF_LDO},
                {text: 'HEURISTICS_CORNERS_LDO', value: PlayerType.HEURISTICS_CORNERS_LDO},
                {text: 'HEURISTICS_CIRCLE_LDO', value: PlayerType.HEURISTICS_CIRCLE_LDO},
                {text: 'HEURISTICS_DIFF_MF', value: PlayerType.HEURISTICS_DIFF_MF},
                {text: 'HEURISTICS_CORNERS_MF', value: PlayerType.HEURISTICS_CORNERS_MF},
                {text: 'HEURISTICS_CIRCLE_MF', value: PlayerType.HEURISTICS_CIRCLE_MF}
            ];
            this.oldmanPlayers = [{text: 'Stary', value: PlayerType.HUMAN}, ...botPlayers];
            this.youngmanPlayers = [{text: 'Młody', value: PlayerType.HUMAN}, ...botPlayers];
            this.form.player0Type = PlayerType.HUMAN;
            this.form.player1Type = PlayerType.HUMAN;
        }

        onSubmit() {
            this.middleColumnWidth = 0;
            let gameConfig: GameConfig = {
                size: +this.form.size,
                players: [
                    {
                        name: this.form.player0Name,
                        type: this.form.player0Type
                    },
                    {
                        name: this.form.player1Name,
                        type: this.form.player1Type
                    }
                ]
            };
            ipcRenderer.send(IpcMessage.START_GAME + IpcMessageType.REQUEST, gameConfig);
            setTimeout(() => {
                this.$router.push('game')
            }, 1500);
        }
    }
</script>

<style lang="scss">
    #game-setup {
        .bg-checkers {
            background: url("~@/assets/bg-checkers.png") no-repeat center;
            background-size: cover;
        }

        .player-avatar {
            height: 100vh;

        }

        .young-man {
            background: url("~@/assets/young-man.png") no-repeat 60% top;
            background-size: cover;
            transform: scaleX(-1);
        }

        .old-man {
            background: url("~@/assets/old-man.png") no-repeat 60% top;
            background-size: cover;
        }

        form .form-group {
            text-align: center;

        }

        .col.animated-col {
            transition: max-width 1s ease, flex 1s ease;
        }
    }
</style>
