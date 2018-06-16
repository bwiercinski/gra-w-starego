import {ActorRef} from "js-actor";

export interface IBoardPosition {
    row: number;
    column: number;
}

export interface IAiOrderState {
    positions?: IBoardPosition[];
    size?: number;
}

export interface IGameConfig {
    size: number;
    players: IPlayer[];
}

export enum PlayerType {
    HUMAN, MINMAX, MINMAX_AB, RANDOM,
    HEURISTICS_DIFF_LDO,
    HEURISTICS_CORNERS_LDO,
    HEURISTICS_CIRCLE_LDO,
    HEURISTICS_DIFF_MF,
    HEURISTICS_CORNERS_MF,
    HEURISTICS_CIRCLE_MF,
}

export interface IPlayer {
    name?: string;
    type?: PlayerType;
    playerPoints?: number;
    actor?: ActorRef;
}
