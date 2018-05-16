import {ActorRef} from "js-actor";
import * as _ from 'lodash';

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
            this.board = new Array(obj).fill(new Array(obj).fill(0));
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
}

export class GameState {
    size: number;
    board: Board;
    playerPoints: number[];
    nextPlayer: number;
}

export class GameConfig {

}

export interface GamePlayer {
    makeMove(gameState: GameState, sender: ActorRef): Promise<void>
}