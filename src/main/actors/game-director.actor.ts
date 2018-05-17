import {GameState} from "../../model/model";
import {AbstractGameActor} from "./abstract-game.actor";
import {StartGameMessage} from "../../model/messages";

export class GameDirectorActor extends AbstractGameActor {

    gameState: GameState;

    constructor() {
        super();
    }

    public createReceive() {
        return this.receiveBuilder()
            .match(StartGameMessage, this.startGame)
            .build()
    }

    startGame(startGameMessage: StartGameMessage) {
        let gameConfig = startGameMessage.gameConfig;
        this.gameState = new GameState(gameConfig.size, gameConfig.players);
    }
}