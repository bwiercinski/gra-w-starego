import {ActorRef} from "js-actor";
import {GameConfig, GameState} from "./model";

export enum IpcMessage {
    START_GAME, GAME_CONFIG
}

export enum IpcMessageType {
    REQUEST = 'REQUEST',
    RESPONSE = 'RESPONSE'
}

export class StartGameMessage {
    constructor(public gameConfig: GameConfig) {
    }
}

export class GameConfigMessage {
    constructor(public sender) {
    }
}

export class MakeMoveMessage {
    constructor(public gameState: GameState, public sender: ActorRef) {
    }
}
