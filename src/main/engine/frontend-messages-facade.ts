import {ipcMain} from "electron";
import {ActorRef} from "js-actor";
import {GameEndMessage} from "../../model/game-end-message";
import {GameState} from "../../model/game-state";
import {GameStateMessage} from "../../model/game-state-message";
import {
    IpcMessage,
    IpcMessageType,
} from "../../model/messages";
import {IGameConfig} from "../../model/model";
import {MoveMadeMessage} from "../../model/move-made-message";
import {PlayerTurnMessage} from "../../model/player-turn-message";
import {StartGameMessage} from "../../model/start-game-message";
import {StopGameMessage} from "../../model/stop-game-message";
import {ActorFactory} from "../actors/actor-system";
import {IMessagesFacade} from "./i-messages-facade";

export class FrontendMessagesFacade implements IMessagesFacade {

    private gameDirectorActor: ActorRef;
    private currentHumanPlayer: ActorRef;

    private gameStateEvent;
    private playerTurnEvent;

    public start() {
        this.initMessages();
        this.gameDirectorActor = ActorFactory.createGameDirectorActor(this);
    }

    public gameStateResponse(gameState: GameState) {
        if (this.gameStateEvent && this.gameStateEvent.sender) {
            this.gameStateEvent.sender.send(IpcMessage.GAME_STATE + IpcMessageType.RESPONSE, gameState);
        }
    }

    public playerTurnMessage(playerTurnMessage: PlayerTurnMessage) {
        this.currentHumanPlayer = playerTurnMessage.sender;
        if (this.gameStateEvent && this.gameStateEvent.sender) {
            this.gameStateEvent.sender.send(IpcMessage.PLAYER_TURN + IpcMessageType.RESPONSE, playerTurnMessage);
        }
    }

    public gameEndMessage(gameEndMessage: GameEndMessage): void {
        return;
    }

    private initMessages() {
        ipcMain.on(IpcMessage.START_GAME + IpcMessageType.REQUEST, (event, gameConfig: IGameConfig) => {
            console.log("START_GAME REQUEST", gameConfig);
            this.gameDirectorActor.tell(new StartGameMessage(gameConfig));
        });

        ipcMain.on(IpcMessage.GAME_STATE + IpcMessageType.REQUEST, (event) => {
            console.log("GAME_STATE REQUEST");
            this.gameStateEvent = event;
            this.gameDirectorActor.tell(new GameStateMessage());
        });

        ipcMain.on(IpcMessage.PLAYER_TURN + IpcMessageType.REQUEST, (event, moveMadeMessage: MoveMadeMessage) => {
            console.log("PLAYER_TURN REQUEST", moveMadeMessage);
            this.playerTurnEvent = event;
            this.gameDirectorActor.tell(new MoveMadeMessage(moveMadeMessage.position, moveMadeMessage.playerIndex),
                this.currentHumanPlayer);
        });

        ipcMain.on(IpcMessage.STOP_GAME + IpcMessageType.REQUEST, (event) => {
            console.log("STOP_GAME REQUEST");
            this.gameDirectorActor.tell(new StopGameMessage());
        });
    }
}
