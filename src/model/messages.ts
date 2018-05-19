import {ActorRef} from "js-actor";
import {GameConfig, GameState, Position} from "./model";

export enum IpcMessage {
    START_GAME, GAME_CONFIG, MOVE_MADE
}

export enum IpcMessageType {
    REQUEST = 'REQUEST',
    RESPONSE = 'RESPONSE'
}

export interface Message {
}

export class StartGameMessage implements Message {
    constructor(public gameConfig: GameConfig) {
    }
}

export class GameConfigMessage implements Message {
}

export class MakeMoveMessage implements Message {
    constructor(public gameState: GameState) {
    }
}

export class MoveMadeMessage implements Message {
    constructor(public position: Position) {
    }
}
