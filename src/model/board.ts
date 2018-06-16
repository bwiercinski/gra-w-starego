import * as _ from "lodash";
import {IBoardPosition} from "./model";

export interface IAiWeightState {
    position?: IBoardPosition;
    board?: Board;
    nextPlayer?: number;
}

export class Board {
    public readonly board: number[][];
    public readonly size: number;

    constructor(obj: number | number[][] | Board) {
        if (obj instanceof Array) {
            this.board = _.cloneDeep(obj);
            this.size = this.board.length;
        } else if (obj instanceof Board) {
            this.board = _.cloneDeep(obj.board);
            this.size = this.board.length;
        } else {
            this.size = obj;
            this.board = new Array(this.size).fill(0).map(() => new Array(this.size).fill(-1));
        }
    }

    public getCell(row: number, column: number): number {
        return this.board[row][column];
    }

    public setCell(row: number, column: number, value: number): void {
        this.board[row][column] = value;
    }

    public getCellByPosition(position: IBoardPosition): number {
        return this.board[position.row][position.column];
    }

    public setCellByPosition(position: IBoardPosition, value: number): void {
        if (position) {
            this.board[position.row][position.column] = value;
        }
    }

    public isFree(row: number, column: number): boolean {
        return this.getCell(row, column) === -1;
    }

    public isFreeByPosition(position: IBoardPosition): boolean {
        return this.getCellByPosition(position) === -1;
    }

    public isFilled(): boolean {
        return !this.board.some((row) => row.some((cell) => cell === -1));
    }

    public givingPoints(row: number, column: number): number {
        if (!this.isFree(row, column)) {
            return null;
        }
        let points = 0;

        let freeFoundCount = 0;
        let diff = 0;

        while (diff < this.size && freeFoundCount <= 1) {
            if (this.board[row][diff] === -1) {
                freeFoundCount++;
            }
            diff++;
        }
        if (freeFoundCount <= 1) {
            points += this.size; // row
        }

        freeFoundCount = 0;
        diff = 0;
        while (diff < this.size && freeFoundCount <= 1) {
            if (this.board[diff][column] === -1) {
                freeFoundCount++;
            }
            diff++;
        }
        if (freeFoundCount <= 1) {
            points += this.size; // column
        }

        points += this.givingPointsIncreasingDiagonal(row, column);
        points += this.givingPointsDecreasingDiagonal(row, column);
        return points;
    }

    public givingPointsByPosition(position: IBoardPosition): number {
        return this.givingPoints(position.row, position.column);
    }

    private givingPointsIncreasingDiagonal(row: number, column: number) {
        let diff1 = 1;
        let diff2 = 1;
        let freeFound = false;
        while (!freeFound && row + diff1 < this.size && column - diff1 >= 0) {
            if (this.board[row + diff1][column - diff1] === -1) {
                freeFound = true;
            }
            diff1++;
        }
        while (!freeFound && row - diff2 >= 0 && column + diff2 < this.size) {
            if (this.board[row - diff2][column + diff2] === -1) {
                freeFound = true;
            }
            diff2++;
        }
        if (!freeFound) {
            const diagonal = diff1 + diff2 - 1;
            return diagonal >= 2 ? diagonal : 0;
        }
        return 0;
    }

    private givingPointsDecreasingDiagonal(row: number, column: number) {
        let diff1 = 1;
        let diff2 = 1;
        let freeFound = false;
        while (!freeFound && row - diff1 >= 0 && column - diff1 >= 0) {
            if (this.board[row - diff1][column - diff1] === -1) {
                freeFound = true;
            }
            diff1++;
        }
        while (!freeFound && row + diff2 < this.size && column + diff2 < this.size) {
            if (this.board[row + diff2][column + diff2] === -1) {
                freeFound = true;
            }
            diff2++;
        }
        if (!freeFound) {
            const diagonal = diff1 + diff2 - 1;
            return diagonal >= 2 ? diagonal : 0;
        }
        return 0;
    }
}
