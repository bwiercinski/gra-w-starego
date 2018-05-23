import {AbstractMinmaxPlayer} from "./abstract-minmax-player";

export class MinmaxAbPlayer extends AbstractMinmaxPlayer {

    constructor(weightOfMove: (Board, Position) => number, depth: number) {
        super(weightOfMove, depth);
    }

    invokeMove(): void {
        this.solveMinMax(0, this.depth - 1, -Infinity, +Infinity, true);
    }

    solveMinMax(value: number, depth: number, alpha: number, beta: number, maximizingPlayer: boolean = true): number {
        let bestValue: number = maximizingPlayer ? alpha : beta;
        let bestFunction = maximizingPlayer ? this.isFirstMax : this.isFirstMin;

        let freePositions = this.nextCellsArray.filter(position => this.board.isFreeByPosition(position));
        for (let position of freePositions) {

            let currentPoints = (maximizingPlayer ? 1 : -1) * this.weightOfMove(this.board, position);

            this.board.setCellByPosition(position, 2);
            let accumulatedPoints = depth > 0 && freePositions.length > 1 ?
                this.solveMinMax(value + currentPoints, depth - 1,
                    maximizingPlayer ? bestValue : alpha,
                    maximizingPlayer ? beta : bestValue, !maximizingPlayer) :
                value + currentPoints;

            if (bestFunction(accumulatedPoints, bestValue)) {
                bestValue = accumulatedPoints;
                if (maximizingPlayer && depth == this.depth - 1) {
                    this.selectedPosition = position;
                }
            }

            this.board.setCellByPosition(position, -1);
            if (maximizingPlayer) {
                if (bestValue >= beta) return beta;
            } else {
                if (bestValue <= alpha) return alpha;
            }
        }
        if (depth == this.depth - 1) {
            console.log(this.selectedPosition, bestValue);
        }
        return bestValue;
    }
}
