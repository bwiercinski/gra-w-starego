import {AiPlayer} from "./ai-player";
import {Board, BoardPosition, GameState} from "../../model/model";

export class MinmaxPlayer extends AiPlayer {
    nextCellsArray: BoardPosition[];
    board: Board;
    choosenPosition: BoardPosition;
    depth = 3;

    protected makeAiMove(gameState: GameState): Promise<BoardPosition> {
        console.log('MinmaxPlayer', gameState);
        return new Promise<BoardPosition>(resolve => {
            this.nextCellsArray = this.createNextCellsArray(gameState.size);
            this.board = gameState.board;
            this.solveMinMax(0, this.depth - 1, true);
            resolve(this.choosenPosition);
        });
    }

    createNextCellsArray(size: number): BoardPosition[] {
        return Array.apply(null, {length: size * size})
            .map(Number.call, Number)
            .map(i => ({
                row: Math.floor(i / size),
                column: Math.floor(i % size)
            }))
    }

    solveMinMax(value: number, depth: number, maximizingPlayer: boolean = true): number {
        let bestValue: number = maximizingPlayer ? -Infinity : +Infinity;

        let bestFunction = maximizingPlayer ? this.isFirstMax : this.isFirstMin;

        let freePositions = this.nextCellsArray.filter(position => this.board.isFreeByPosition(position));
        for (let position of freePositions) {

            let currentPoints = (maximizingPlayer ? 1 : -1) * this.board.givingPointsByPosition(position);

            this.board.setCellByPosition(position, 2);
            let accumulatedPoints = depth > 0 && freePositions.length > 1 ?
                this.solveMinMax(value + currentPoints, depth - 1, !maximizingPlayer) :
                value + currentPoints;

            if (bestFunction(accumulatedPoints, bestValue)) {
                bestValue = accumulatedPoints;
                if (maximizingPlayer && depth == this.depth) {
                    this.choosenPosition = position;
                }
            }

            this.board.setCellByPosition(position, -1);
        }
        if (depth == this.depth - 1) {
            console.log(this.choosenPosition, bestValue);
        }
        return bestValue;
    }

    isFirstMin = (a, b) => a < b;
    isFirstMax = (a, b) => a > b;

    /*
    function minimax(node, depth, maximizingPlayer)
        if depth = 0 or node is a terminal node
            return the heuristic value of node

        if maximizingPlayer
            bestValue := −∞
            for each child of node
                v := minimax(child, depth − 1, FALSE)
                bestValue := max(bestValue, v)
            return bestValue

        else    (* minimizing player *)
            bestValue := +∞
            for each child of node
                v := minimax(child, depth − 1, TRUE)
                bestValue := min(bestValue, v)
            return bestValue
    */
}
