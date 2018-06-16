import {Board, IAiWeightState} from "../../model/board";
import {GameState} from "../../model/game-state";
import {IBoardPosition} from "../../model/model";
import {AiPlayer} from "./ai-player";

export abstract class AbstractMinmaxPlayer extends AiPlayer {
    protected nextCellsArray: IBoardPosition[];
    protected board: Board;
    protected nextPlayer: number;
    protected selectedPosition: IBoardPosition;
    protected depth: number;
    protected weightOfMove: (state: IAiWeightState) => number;

    protected constructor(weightOfMove: (state: IAiWeightState) => number, depth: number) {
        super();
        this.depth = depth;
        this.weightOfMove = weightOfMove;
    }

    protected makeAiMove(gameState: GameState): Promise<IBoardPosition> {
        console.log("MinmaxPlayer", gameState);
        return new Promise<IBoardPosition>((resolve) => {
            this.board = gameState.board;
            this.nextPlayer = gameState.nextPlayer;
            this.nextCellsArray = this.createNextCellsArray(gameState.size);
            this.invokeMove();
            resolve(this.selectedPosition);
        });
    }

    protected abstract invokeMove(): void;

    protected createNextCellsArray(size: number): IBoardPosition[] {
        return Array.apply(null, {length: size * size})
            .map(Number.call, Number)
            .map((i) => ({
                column: Math.floor(i % size),
                row: Math.floor(i / size),
            }))
            .filter((position) => this.board.isFreeByPosition(position));
    }

    protected isFirstMin = (a, b) => a < b;
    protected isFirstMax = (a, b) => a > b;
}
