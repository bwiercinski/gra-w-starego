import {AiPlayer} from "./ai-player";
import {AiWeightState, Board, BoardPosition, GameState} from "../../model/model";

export abstract class AbstractMinmaxPlayer extends AiPlayer {
    nextCellsArray: BoardPosition[];
    board: Board;
    nextPlayer: number;
    selectedPosition: BoardPosition;
    depth: number;
    weightOfMove: (state: AiWeightState) => number;

    protected constructor(weightOfMove: (state: AiWeightState) => number, depth: number) {
        super();
        this.depth = depth;
        this.weightOfMove = weightOfMove;
    }

    protected makeAiMove(gameState: GameState): Promise<BoardPosition> {
        console.log('MinmaxPlayer', gameState);
        return new Promise<BoardPosition>(resolve => {
            this.board = gameState.board;
            this.nextPlayer = gameState.nextPlayer;
            this.nextCellsArray = this.createNextCellsArray(gameState.size);
            this.invokeMove();
            resolve(this.selectedPosition);
        });
    }

    abstract invokeMove(): void;

    createNextCellsArray(size: number): BoardPosition[] {
        return Array.apply(null, {length: size * size})
            .map(Number.call, Number)
            .map(i => ({
                row: Math.floor(i / size),
                column: Math.floor(i % size)
            }))
            .filter(position => this.board.isFreeByPosition(position));
    }

    isFirstMin = (a, b) => a < b;
    isFirstMax = (a, b) => a > b;
}
