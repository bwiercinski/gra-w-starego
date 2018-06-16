import {IBoardPosition} from "./model";

export class MoveMadeMessage {
    constructor(public position: IBoardPosition, public playerIndex: number) {
    }
}
