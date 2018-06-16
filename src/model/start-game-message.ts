import {IGameConfig} from "./model";

export class StartGameMessage {
    constructor(public gameConfig: IGameConfig) {
    }
}
