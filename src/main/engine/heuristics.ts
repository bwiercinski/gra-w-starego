import {IAiWeightState} from "../../model/board";
import {IAiOrderState, IBoardPosition} from "../../model/model";

export class Heuristics {
    public maxDifference(state: IAiWeightState): number {
        return state.board.givingPointsByPosition(state.position);
    }

    public maxDifferenceRespectCorners(state: IAiWeightState): number {
        return 100 * state.board.givingPointsByPosition(state.position) +
            (state.nextPlayer === state.board.size % 2 ? 1 : -1) *
            this.distanceFromMidPoint(state.position, state.board.size);
    }

    public maxDifferenceRespectSecondCircle(state: IAiWeightState): number {
        const size = state.board.size;
        const isSecondCircle =
            (state.position.row === 1 || state.position.row === size - 2) &&
            0 < state.position.column && state.position.column < size - 1
            ||
            (state.position.column === 1 || state.position.column === size - 2) &&
            0 < state.position.row && state.position.row < size - 1;
        return state.board.givingPointsByPosition(state.position) + (isSecondCircle ? 2 : 0);
    }

    public leftDownOrder(state: IAiOrderState): IBoardPosition[] {
        return state.positions;
    }

    public midFirst(state: IAiOrderState): IBoardPosition[] {
        const distances: Array<{ index: number, value: number }> = [];
        for (let i = 0; i < state.positions.length; i++) {
            distances.push({
                index: i,
                value: this.distanceFromMidPoint(state.positions[i], state.size),
            });
        }
        distances.sort((a, b) => a.value - b.value);
        const positions: IBoardPosition[] = [];
        for (const value of distances) {
            positions.push(state.positions[value.index]);
        }
        return positions;
    }

    public distanceFromMidPoint(position: IBoardPosition, size: number) {
        const midPoint = (size - 1) / 2;
        return Math.hypot(
            position.row - midPoint,
            position.column - midPoint,
        );
    }
}
