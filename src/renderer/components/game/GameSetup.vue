<template>
    <b-container id="game-setup" fluid class="flex-lg-fill-1">
        <b-row>
            <b-col cols="3" class="player-avatar old-man"></b-col>
            <b-col>
                <b-form @submit="onSubmit">

                    <b-row>
                        <h1 class="center-header">Przygotuj się!</h1>
                    </b-row>

                    <b-row>

                        <b-col>
                            <h2 class="center-header">Stary</h2>
                            <b-form-group id="player1TypeGroup" label="Rodzaj gracza:" label-for="player1Type">
                                <b-form-select id="player1Type" :options="oldmanPlayers" required
                                               v-model="form.player1Type">
                                </b-form-select>
                            </b-form-group>
                            <b-form-group id="player1NameGroup" label="Nazwa:" label-for="player1Name">
                                <b-form-input id="player1Name" type="text" v-model="form.player1Name">
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col>
                            <h2 class="center-header">Młody</h2>
                            <b-form-group id="player2TypeGroup" label="Rodzaj gracza:" label-for="player2Type">
                                <b-form-select id="player2Type" :options="youngmanPlayers" required
                                               v-model="form.player2Type">
                                </b-form-select>
                            </b-form-group>
                            <b-form-group id="player2NameGroup" label="Nazwa:" label-for="player2Name">
                                <b-form-input id="player2Name" type="text" v-model="form.player2Name">
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                    </b-row>

                    <b-row>
                        <b-col>
                            <b-form-group id="sizeGroup" label="Rozmiar:" label-for="size">
                                <b-form-input id="size" type="number" v-model="form.size">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col class="center-header">
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </b-col>
                    </b-row>

                </b-form>
            </b-col>
            <b-col cols="3" class="player-avatar young-man"></b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Vue from 'vue';
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
    export default class GameSetup extends Vue {
        form = {
            player1Type: null,
            player1Name: 'Stary',
            player2Type: null,
            player2Name: 'Młody',
            size: 8
        };

        oldmanPlayers: object[];
        youngmanPlayers: object[];

        constructor() {
            super();

            let botPlayers = [
                {text: 'Minmax', value: PlayerType.MINMAX},
                {text: 'Minmax AlfaBeta', value: PlayerType.MINMAX_AB},
                {text: 'Losowy', value: PlayerType.RANDOM}
            ];
            this.oldmanPlayers = [{text: 'Stary', value: PlayerType.HUMAN}, ...botPlayers];
            this.youngmanPlayers = [{text: 'Młody', value: PlayerType.HUMAN}, ...botPlayers];
        }

        onSubmit() {
            let gameState: GameConfig = {
                size: this.form.size,
                players: [
                    {
                        name: this.form.player1Name,
                        type: this.form.player1Type
                    },
                    {
                        name: this.form.player2Name,
                        type: this.form.player2Type
                    }
                ]
            };
            console.log(gameState);
            // setTimeout(() => this.router.push('game'), 200);
            this.$router.push('game');
        }
    }
</script>

<style lang="scss">
    #game-setup {
        .player-avatar {
            height: 100vh;

        }
        .young-man {
            background: url("~@/assets/young-man.jpg") no-repeat center center;
            background-size: cover;
            transform: scaleX(-1);
        }
        .old-man {
            background: url("~@/assets/old-man.jpg") no-repeat center center;
            background-size: cover;
        }
        .center-header {
            text-align: center;
            width: 100%;
        }
    }
</style>
