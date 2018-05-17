import {ActorRef} from "js-actor";
import {GameConfig, GameState} from "./model";

export class StartGameMessage {
    constructor(public gameConfig: GameConfig) {
    }
}

export class MakeMoveMessage {
    constructor(public gameState: GameState, public sender: ActorRef) {
    }
}
