import {GameConfig, GameState, Position} from "./model";
import {ActorRef} from "../../node_modules/js-actor/bin";

export enum IpcMessage {
    START_GAME, GAME_STATE, PLAYER_TURN, STOP_GAME
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

export class GameStateMessage implements Message {
}

export class StopGameMessage implements Message {
}

export class MakeMoveMessage implements Message {
    constructor(public gameState: GameState) {
    }
}

export class MoveMadeMessage implements Message {
    constructor(public position: Position, public playerIndex: number) {
    }
}

export class PlayerTurnMessage implements Message {
    constructor(public playerIndex: number, public sender: ActorRef) {
    }
}
