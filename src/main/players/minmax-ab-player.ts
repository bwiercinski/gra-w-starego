import {IAiWeightState} from "../../model/board";
import {IAiOrderState, IBoardPosition} from "../../model/model";
import {AbstractMinmaxPlayer} from "./abstract-minmax-player";

export class MinmaxAbPlayer extends AbstractMinmaxPlayer {

    protected orderPositions: (state: IAiOrderState) => IBoardPosition[];

    constructor(weightOfMove: (state: IAiWeightState) => number, depth: number,
                orderPositions: (state: IAiOrderState) => IBoardPosition[]) {
        super(weightOfMove, depth);
        this.orderPositions = orderPositions;
    }

    protected invokeMove(): void {
        this.solveMinMax(0, this.depth - 1, -Infinity, +Infinity, true);
    }

    protected solveMinMax(value: number, depth: number, alpha: number, beta: number,
                          maximizingPlayer: boolean = true): number {
        let bestValue: number = maximizingPlayer ? alpha : beta;
        const bestFunction = maximizingPlayer ? this.isFirstMax : this.isFirstMin;

        const freePositions = this.orderPositions({
            positions: this.nextCellsArray.filter((position) => this.board.isFreeByPosition(position)),
            size: this.board.size,
        });
        for (const position of freePositions) {
            const currentPoints = (maximizingPlayer ? 1 : -1) * this.weightOfMove({
                board: this.board,
                nextPlayer: this.nextPlayer,
                position,
            });

            this.board.setCellByPosition(position, 2);
            const accumulatedPoints = depth > 0 && freePositions.length > 1 ?
                this.solveMinMax(value + currentPoints, depth - 1,
                    maximizingPlayer ? bestValue : alpha,
                    maximizingPlayer ? beta : bestValue, !maximizingPlayer) :
                value + currentPoints;

            if (bestFunction(accumulatedPoints, bestValue)) {
                bestValue = accumulatedPoints;
                if (maximizingPlayer && depth === this.depth - 1) {
                    this.selectedPosition = position;
                }
            }

            this.board.setCellByPosition(position, -1);
            if (maximizingPlayer) {
                if (bestValue >= beta) {
                    return beta;
                }
            } else {
                if (bestValue <= alpha) {
                    return alpha;
                }
            }
        }
        return bestValue;
    }
}
