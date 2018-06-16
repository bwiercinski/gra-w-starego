import {IAiWeightState} from "../../model/board";
import {AbstractMinmaxPlayer} from "./abstract-minmax-player";

export class MinmaxPlayer extends AbstractMinmaxPlayer {

    constructor(weightOfMove: (state: IAiWeightState) => number, depth: number) {
        super(weightOfMove, depth);
    }

    protected invokeMove(): void {
        this.solveMinMax(0, this.depth - 1, true);
    }

    protected solveMinMax(value: number, depth: number, maximizingPlayer: boolean = true): number {
        let bestValue: number = maximizingPlayer ? -Infinity : +Infinity;

        const bestFunction = maximizingPlayer ? this.isFirstMax : this.isFirstMin;

        const freePositions = this.nextCellsArray.filter((position) => this.board.isFreeByPosition(position));
        for (const position of freePositions) {

            const currentPoints = (maximizingPlayer ? 1 : -1) * this.weightOfMove({
                board: this.board,
                nextPlayer: this.nextPlayer,
                position,
            });

            this.board.setCellByPosition(position, 2);
            const accumulatedPoints = depth > 0 && freePositions.length > 1 ?
                this.solveMinMax(value + currentPoints, depth - 1, !maximizingPlayer) :
                value + currentPoints;

            if (bestFunction(accumulatedPoints, bestValue)) {
                bestValue = accumulatedPoints;
                if (maximizingPlayer && depth === this.depth - 1) {
                    this.selectedPosition = position;
                }
            }

            this.board.setCellByPosition(position, -1);
        }
        return bestValue;
    }
}
