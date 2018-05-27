import {ipcMain} from "electron";
import {
    GameEndMessage,
    GameStateMessage,
    IpcMessage,
    IpcMessageType,
    MoveMadeMessage,
    PlayerTurnMessage,
    StartGameMessage,
    StopGameMessage
} from "../../model/messages";
import {GameConfig, GameState} from "../../model/model";
import {ActorFactory} from "../actors/actor-system";
import {ActorRef} from "js-actor";
import {MessagesFacade} from "./messages-facade";

export class FrontendMessagesFacade implements MessagesFacade {

    gameDirectorActor: ActorRef;
    currentHumanPlayer: ActorRef;

    gameStateEvent;
    playerTurnEvent;

    start() {
        this.initMessages();
        this.gameDirectorActor = ActorFactory.createGameDirectorActor(this);
    }

    initMessages() {
        ipcMain.on(IpcMessage.START_GAME + IpcMessageType.REQUEST, (event, gameConfig: GameConfig) => {
            console.log('START_GAME REQUEST', gameConfig);
            this.gameDirectorActor.tell(new StartGameMessage(gameConfig));
        });

        ipcMain.on(IpcMessage.GAME_STATE + IpcMessageType.REQUEST, (event) => {
            console.log('GAME_STATE REQUEST');
            this.gameStateEvent = event;
            this.gameDirectorActor.tell(new GameStateMessage);
        });

        ipcMain.on(IpcMessage.PLAYER_TURN + IpcMessageType.REQUEST, (event, moveMadeMessage: MoveMadeMessage) => {
            console.log('PLAYER_TURN REQUEST', moveMadeMessage);
            this.playerTurnEvent = event;
            this.gameDirectorActor.tell(new MoveMadeMessage(moveMadeMessage.position, moveMadeMessage.playerIndex),
                this.currentHumanPlayer);
        });

        ipcMain.on(IpcMessage.STOP_GAME + IpcMessageType.REQUEST, (event) => {
            console.log('STOP_GAME REQUEST');
            this.gameDirectorActor.tell(new StopGameMessage);
        });
    }

    gameStateResponse(gameState: GameState) {
        this.gameStateEvent && this.gameStateEvent.sender
            .send(IpcMessage.GAME_STATE + IpcMessageType.RESPONSE, gameState);
    }

    playerTurnMessage(playerTurnMessage: PlayerTurnMessage) {
        this.currentHumanPlayer = playerTurnMessage.sender;
        this.gameStateEvent && this.gameStateEvent.sender
            .send(IpcMessage.PLAYER_TURN + IpcMessageType.RESPONSE, playerTurnMessage);
    }

    gameEndMessage(gameEndMessage: GameEndMessage): void {
    }
}