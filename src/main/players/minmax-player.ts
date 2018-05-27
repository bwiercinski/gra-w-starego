import {AbstractMinmaxPlayer} from "./abstract-minmax-player";
import {AiWeightState} from "../../model/model";

export class MinmaxPlayer extends AbstractMinmaxPlayer {

    constructor(weightOfMove: (state: AiWeightState) => number, depth: number) {
        super(weightOfMove, depth);
    }

    invokeMove(): void {
        this.solveMinMax(0, this.depth - 1, true);
    }

    solveMinMax(value: number, depth: number, maximizingPlayer: boolean = true): number {
        let bestValue: number = maximizingPlayer ? -Infinity : +Infinity;

        let bestFunction = maximizingPlayer ? this.isFirstMax : this.isFirstMin;

        let freePositions = this.nextCellsArray.filter(position => this.board.isFreeByPosition(position));
        for (let position of freePositions) {

            let currentPoints = (maximizingPlayer ? 1 : -1) * this.weightOfMove({
                board: this.board,
                position: position,
                nextPlayer: this.nextPlayer
            });

            this.board.setCellByPosition(position, 2);
            let accumulatedPoints = depth > 0 && freePositions.length > 1 ?
                this.solveMinMax(value + currentPoints, depth - 1, !maximizingPlayer) :
                value + currentPoints;

            if (bestFunction(accumulatedPoints, bestValue)) {
                bestValue = accumulatedPoints;
                if (maximizingPlayer && depth == this.depth - 1) {
                    this.selectedPosition = position;
                }
            }

            this.board.setCellByPosition(position, -1);
        }
        if (depth == this.depth - 1) {
            // console.log(this.selectedPosition, bestValue);
        }
        return bestValue;
    }
}
