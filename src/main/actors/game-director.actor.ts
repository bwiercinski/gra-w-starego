import {GameConfig, GameState} from "../../model/model";
import {AbstractGameActor} from "./abstract-game.actor";
import {GameConfigMessage, IpcMessage, IpcMessageType, StartGameMessage} from "../../model/messages";

export interface GameDirectorState {
    gameConfig?: GameConfig;
    gameState?: GameState;
}

export const gameDirectorState: GameDirectorState = {};

export class GameDirectorActor extends AbstractGameActor {
    constructor() {
        super();
    }

    public createReceive() {
        return this.receiveBuilder()
            .match(StartGameMessage, this.startGameMessage)
            .match(GameConfigMessage, this.gameConfigMessage)
            .build()
    }

    startGameMessage(startGameMessage: StartGameMessage) {
        gameDirectorState.gameConfig = startGameMessage.gameConfig;
        gameDirectorState.gameState = new GameState(gameDirectorState.gameConfig.size, gameDirectorState.gameConfig.players);
    }

    gameConfigMessage(gameConfigMessage: GameConfigMessage) {
        console.log('GAME_CONFIG RESPONSE',);
        gameConfigMessage.sender.send(IpcMessage.GAME_CONFIG + IpcMessageType.RESPONSE, gameDirectorState.gameConfig)
    }
}