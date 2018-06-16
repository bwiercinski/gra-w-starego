import {MainInterface} from "electron";

declare module "vue/types/vue" {
    /* tslint:disable */
    interface Vue {
        readonly $electron: MainInterface;
    }
    /* tslint:enable */
}
