import {ipcMain} from "electron";
import {GameConfigMessage, IpcMessage, IpcMessageType, StartGameMessage} from "../../model/messages";
import {GameConfig} from "../../model/model";
import {ActorFactory} from "../actors/actor-system";
import {ActorRef} from "../../../node_modules/js-actor/bin";

export class MessagesFacade {

    gameDirectorActor: ActorRef;
    event;

    start() {
        this.initMessages();
        this.gameDirectorActor = ActorFactory.createGameDirectorActor(this);
    }

    initMessages() {
        ipcMain.on(IpcMessage.START_GAME + IpcMessageType.REQUEST, (event, gameConfig: GameConfig) => {
            console.log('START_GAME REQUEST', gameConfig);
            this.gameDirectorActor.tell(new StartGameMessage(gameConfig));
        });
        ipcMain.on(IpcMessage.GAME_CONFIG + IpcMessageType.REQUEST, (event) => {
            this.event = event;
            console.log('GAME_CONFIG REQUEST');
            this.gameDirectorActor.tell(new GameConfigMessage());
        });
    }

    gameConfigResponse(gameConfig: GameConfig) {
        this.event.sender.send(IpcMessage.GAME_CONFIG + IpcMessageType.RESPONSE, gameConfig);
    }

}