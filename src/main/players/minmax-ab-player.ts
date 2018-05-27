import {AbstractMinmaxPlayer} from "./abstract-minmax-player";
import {AiOrderState, AiWeightState, BoardPosition} from "../../model/model";

export class MinmaxAbPlayer extends AbstractMinmaxPlayer {

    orderPositions: (state: AiOrderState) => BoardPosition[];

    constructor(weightOfMove: (state: AiWeightState) => number, depth: number, orderPositions: (state: AiOrderState) => BoardPosition[]) {
        super(weightOfMove, depth);
        this.orderPositions = orderPositions;
    }

    invokeMove(): void {
        this.solveMinMax(0, this.depth - 1, -Infinity, +Infinity, true);
    }

    solveMinMax(value: number, depth: number, alpha: number, beta: number, maximizingPlayer: boolean = true): number {
        let bestValue: number = maximizingPlayer ? alpha : beta;
        let bestFunction = maximizingPlayer ? this.isFirstMax : this.isFirstMin;

        let freePositions = this.orderPositions( {
            positions: this.nextCellsArray.filter(position => this.board.isFreeByPosition(position)),
            size: this.board.size
        });
        for (let position of freePositions) {

            let currentPoints = (maximizingPlayer ? 1 : -1) * this.weightOfMove({
                board: this.board,
                position: position,
                nextPlayer: this.nextPlayer
            });

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
            // console.log(this.selectedPosition, bestValue);
        }
        return bestValue;
    }
}
