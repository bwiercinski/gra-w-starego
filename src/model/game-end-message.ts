import {GameState} from "./game-state";

export class GameEndMessage {
    constructor(public gameState: GameState) {
    }
}
