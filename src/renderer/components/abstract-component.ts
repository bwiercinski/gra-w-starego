import Vue from 'vue';
import {safeSelector} from "../../common/safe-selector";

export class AbstractComponent extends Vue {
    ss = safeSelector
}