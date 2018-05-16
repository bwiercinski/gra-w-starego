import {GameConfig, GameState} from "../../model/model";
import {AbstractGameActor} from "./abstract-game.actor";

export class GameDirectorActor extends AbstractGameActor {

    gameState: GameState;

    gameConfig: GameConfig;

    constructor(gameConfig: GameConfig) {
        super();
        this.gameState = new GameState();
        this.gameConfig = gameConfig;
    }

    public createReceive() {
        return this.receiveBuilder()
            .build()
    }
}