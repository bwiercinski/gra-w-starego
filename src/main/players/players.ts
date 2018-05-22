import {BoardPosition, GameState} from "../../model/model";
import {AiPlayer} from "./ai-player";

export class MinmaxGamePlayer extends AiPlayer {
    protected makeAiMove(gameState: GameState): Promise<BoardPosition> {
        console.log('MinmaxGamePlayer', gameState);
        return new Promise<BoardPosition>(null);
    }
}

export class MinmaxAlphaBetaGamePlayer extends AiPlayer {
    protected makeAiMove(gameState: GameState): Promise<BoardPosition> {
        console.log('MinmaxAlphaBetaGamePlayer', gameState);
        return new Promise<BoardPosition>(null);
    }
}

