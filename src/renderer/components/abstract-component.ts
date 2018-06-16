import {ipcRenderer} from "electron";
import Vue from "vue";
import {safeSelector} from "../../common/safe-selector";
import {IpcMessage, IpcMessageType} from "../../model/messages";

export class AbstractComponent extends Vue {
    public ss = safeSelector;

    public addIpcListener(messageType: IpcMessage, listener: (event, args) => void) {
        ipcRenderer.removeAllListeners(messageType + IpcMessageType.RESPONSE);
        ipcRenderer.on(messageType + IpcMessageType.RESPONSE, listener);
    }
}
