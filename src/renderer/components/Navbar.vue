<template>
    <b-navbar ref="navbar" id="navbar" toggleable="sm" type="dark" variant="dark" :sticky="true">
        <b-navbar-brand to="/">Grajmy w starego</b-navbar-brand>
        <b-navbar-nav>
            <b-nav-item v-for="link in links" :key="link.name" :to="link.path" exact>{{link.name}}</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import {Watch} from 'vue-property-decorator';
    import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
    import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
    import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
    import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle';
    import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';
    import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav';
    import {AbstractComponent} from "./abstract-component";

    export class Link {
        name: string;
        path: string;

        constructor(name: string, path: string) {
            this.name = name;
            this.path = path;
        }
    }

    export const navbarHeight = {
        height: 0
    };

    @Component({
        name: 'navbar',
        components: {
            'b-collapse': bCollapse,
            'b-nav-item': bNavItem,
            'b-navbar': bNavbar,
            'b-navbar-toggle': bNavbarToggle,
            'b-navbar-brand': bNavbarBrand,
            'b-navbar-nav': bNavbarNav
        }
    })
    export default class Navbar extends AbstractComponent {

        $refs: {
            navbar: HTMLFormElement
        };

        links: Link[] = [
            new Link('Game', '/game'),
            new Link('Start', '/start')
        ];

        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', () => navbarHeight.height = this.$refs.navbar.offsetHeight);
            })
        }

        @Watch('child')
        pathChanged() {
            console.log('Changed current path to: ' + this.$route.path);
        }
    }

</script>
