import {GamePlayer} from "../../model/model";
import {AbstractGameActor} from "./abstract-game.actor";
import {MakeMoveMessage} from "../../model/messages";

export class GamePlayerActor extends AbstractGameActor {

    name: string;

    gamePlayer: GamePlayer;

    constructor(name: string, gamePlayer: GamePlayer) {
        super();
        this.name = name;
        this.gamePlayer = gamePlayer;
    }

    public createReceive() {
        return this.receiveBuilder()
            .match(MakeMoveMessage, (makeMoveMessage: MakeMoveMessage) =>
                this.gamePlayer.makeMove(makeMoveMessage.gameState, makeMoveMessage.sender))
            .build()
    }
}