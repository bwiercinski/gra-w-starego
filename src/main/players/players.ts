import {BoardPosition, GameState} from "../../model/model";
import {AiPlayer} from "./ai-player";

export class MinmaxAlphaBetaGamePlayer extends AiPlayer {
    protected makeAiMove(gameState: GameState): Promise<BoardPosition> {
        console.log('MinmaxAlphaBetaGamePlayer', gameState);
        return new Promise<BoardPosition>(null);
    }
}

