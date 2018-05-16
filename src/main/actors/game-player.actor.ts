import {GamePlayer} from "../../model/model";
import {AbstractGameActor} from "./abstract-game.actor";

export class GamePlayerActor extends AbstractGameActor {

    gamePlayer:GamePlayer;

    public createReceive() {
        return this.receiveBuilder()
            .build()
    }
}