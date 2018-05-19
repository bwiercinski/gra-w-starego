import {ActorRef} from "js-actor";
import * as _ from 'lodash';
import {ActorFactory} from "../main/actors/actor-system";

export interface Position {
    row: number;
    column: number;
}

export class Board {
    private readonly board: number[][];

    constructor(obj: number | Board) {
        if (obj instanceof Board) {
            this.board = _.cloneDeep(obj.board);
        } else {
            this.board = new Array(obj).fill(new Array(obj).fill(-1));
        }
    }

    getCell(row: number, column: number): number {
        return this.board[row][column];
    }

    setCell(row: number, column: number, value: number): void {
        this.board[row][column] = value;
    }

    getCellByPosition(position: Position): number {
        return this.board[position.row][position.column];
    }

    setCellByPosition(position: Position, value: number): void {
        this.board[position.row][position.column] = value;
    }

    isFree(position: Position): boolean {
        return this.getCellByPosition(position) === -1;
    }
}

export class GameState {
    size: number;
    board: Board;
    players: Player[];
    nextPlayer: number;

    constructor(size: number, players: Player[]) {
        this.size = size;
        this.board = new Board(this.size);
        this.players = players.map(player => ({
            name: player.name,
            type: player.type,
            playerPoints: 0,
            actor: ActorFactory.createGameActor(player)
        }));
        this.nextPlayer = 0;
    }
}

export interface GameConfig {
    size: number;
    players: Player[];
}

export enum PlayerType {
    HUMAN, MINMAX, MINMAX_AB, RANDOM
}

export interface Player {
    name?: string;
    type?: PlayerType;
    playerPoints?: number;
    actor?: ActorRef;
}
