import {AiPlayer} from "./ai-player";
import {Board, BoardPosition, GameState} from "../../model/model";

export class MinmaxPlayer extends AiPlayer {
    nextCellsArray: BoardPosition[];

    protected makeAiMove(gameState: GameState): Promise<BoardPosition> {
        console.log('MinmaxPlayer', gameState);
        this.nextCellsArray = this.createNextCellsArray(gameState.size);
        return new Promise<BoardPosition>(null);
    }

    createNextCellsArray(size: number): BoardPosition[] {
        return Array.apply(null, {length: size * size})
            .map(Number.call, Number)
            .map(i => ({
                row: Math.floor(i / size),
                column: Math.floor(i % size)
            }))
    }

    solveMinMax(board: Board, position: BoardPosition, depth: number, maximizingPlayer: boolean = true): [BoardPosition, number] {
        let bestValue: [BoardPosition, number] = [null, maximizingPlayer ? -Infinity : +Infinity];
        let bestFunction = maximizingPlayer ? this.isFirstMax : this.isFirstMin;

        let givingPoints: number = position != null ? board.givingPointsByPosition(position) : 0;

        if (depth == 0) {
            return [position, givingPoints];
        }

        board.setCellByPosition(position, 2);
        for (let position of this.nextCellsArray.filter(position => board.isFreeByPosition(position))) {

            let minMax: [BoardPosition, number] = this.solveMinMax(board, position, depth - 1, !maximizingPlayer);
            minMax[1] += (maximizingPlayer ? 1 : -1) * givingPoints;
            if (bestFunction(minMax[1], bestValue[1])) {
                bestValue = minMax;
            }
        }
        board.setCellByPosition(position, -1);
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

let b = new Board([
    [0, -1, -1],
    [-1, -1, 0],
    [-1, 0, -1]
]);

let minmaxPlayer = new MinmaxPlayer();
minmaxPlayer.nextCellsArray = minmaxPlayer.createNextCellsArray(3);
let result = minmaxPlayer.solveMinMax(b, null, 2);
console.log(result);