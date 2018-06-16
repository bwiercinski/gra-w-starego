import {Board} from "./board";
import {IPlayer} from "./model";

export class GameState {
    public size: number;
    public board: Board;
    public players: IPlayer[];
    public nextPlayer: number;

    constructor(size: number, players: IPlayer[]) {
        this.size = size;
        this.board = new Board(this.size);
        this.players = players;
        this.nextPlayer = 0;
    }
}
