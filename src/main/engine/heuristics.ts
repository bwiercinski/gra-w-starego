import {AiOrderState, AiWeightState, BoardPosition} from "../../model/model";
import * as _ from "lodash";

export class Heuristics {
    maxDifference(state: AiWeightState): number {
        return state.board.givingPointsByPosition(state.position);
    }

    maxDifferenceRespectCorners(state: AiWeightState): number {
        return state.board.givingPointsByPosition(state.position) * 100 +
            (state.nextPlayer === state.board.size % 2 ? 1 : -1) * Heuristics.distanceFromMidPoint(state.position, state.board.size);
    }

    maxDifference12(state: AiWeightState): number {
        return state.board.givingPointsByPosition(state.position);
    }

    leftDownOrder(state: AiOrderState): BoardPosition[] {
        return state.positions;
    }

    midFirst(state: AiOrderState): BoardPosition[] {
        let distances: { index: number, value: number }[] = [];
        for (let i = 0; i < state.positions.length; i++) {
            distances.push({
                index: i,
                value: Heuristics.distanceFromMidPoint(state.positions[i], state.size)
            })
        }
        distances.sort((a,b) => a.value - b.value);
        let positions: BoardPosition[] = [];
        for (const value of distances) {
            positions.push(state.positions[value.index]);
        }
        return positions;
    }

    static distanceFromMidPoint(position: BoardPosition, size: number) {
        let midPoint = (size - 1) / 2;
        return Math.hypot(
            position.row - midPoint,
            position.column - midPoint
        )
    }
}
