<template>
    <div>
        <input v-model="msg">
        <p>prop: {{propMessage}}</p>
        <p>msg: {{msg}}</p>
        <p>helloMsg: {{helloMsg}}</p>
        <p>computed msg: {{computedMsg}}</p>
        <button @click="greet">Greet</button>
        <b-container>

        </b-container>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component'
    import bContainer from 'bootstrap-vue/es/components/layout/container'

    @Component({
        name: 'x',
        components: {
            'b-container': bContainer
        }
    })
    export default class X extends Vue {
        propMessage: String = '';
        // initial data
        msg: number = 123;

        // use prop values for initial data
        helloMsg = 'Hello, ' + this.propMessage;

        // lifecycle hook
        mounted() {
            this.greet()
        }

        // computed
        get computedMsg() {
            return 'computed ' + this.msg;
        }

        // method
        greet() {
            //alert('greeting: ' + this.msg)
        }
    }
</script>