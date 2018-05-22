import {GameState, BoardPosition} from "../../model/model";
import * as _ from 'lodash';
import {AiPlayer} from "./ai-player";

export class RandomGamePlayer extends AiPlayer {

    protected makeAiMove(gameState: GameState): Promise<BoardPosition> {
        return new Promise(resolve => setTimeout(resolve, 1000))
            .then(() => {
                let randomFreeField = _.sample(gameState.board.board
                    .reduce((acc, val) => acc.concat(val), [])
                    .reduce((prev, curr, index) => {
                        if (curr == -1) prev.push(index);
                        return prev;
                    }, []));
                return {
                    row: Math.floor(randomFreeField / gameState.size),
                    column: Math.floor(randomFreeField % gameState.size)
                };
            });
    }

}