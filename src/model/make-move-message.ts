import {GameState} from "./game-state";

export class MakeMoveMessage {
    constructor(public gameState: GameState) {
    }
}
