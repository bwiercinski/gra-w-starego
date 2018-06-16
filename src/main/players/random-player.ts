import * as _ from "lodash";
import {GameState} from "../../model/game-state";
import {IBoardPosition} from "../../model/model";
import {AiPlayer} from "./ai-player";

export class RandomGamePlayer extends AiPlayer {

    protected makeAiMove(gameState: GameState): Promise<IBoardPosition> {
        return new Promise((resolve) => setTimeout(resolve, 100))
            .then(() => this.randomField(gameState));
    }

    protected randomField(gameState: GameState): IBoardPosition {
        const randomFreeField = _.sample(gameState.board.board
            .reduce((acc, val) => acc.concat(val), [])
            .reduce((prev, curr, index) => {
                if (curr === -1) { prev.push(index); }
                return prev;
            }, []));
        return {
            column: Math.floor(randomFreeField % gameState.size),
            row: Math.floor(randomFreeField / gameState.size),
        };
    }
}
