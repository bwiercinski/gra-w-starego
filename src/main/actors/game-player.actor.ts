import {AbstractGameActor} from "./abstract-game.actor";
import {MakeMoveMessage} from "../../model/messages";
import * as _ from 'lodash';
import {GamePlayer} from "../players/game-player";

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
            .match(MakeMoveMessage, this.messageDecorator(this.makeMoveMessage))
            .build()
    }

    async makeMoveMessage(self: GamePlayerActor, makeMoveMessage: MakeMoveMessage) {
        await new Promise((resolve) => {
            self.gamePlayer.makeMove(_.cloneDeep(makeMoveMessage.gameState), self.getSender(), self.getSelf());
            resolve();
        });
    }
}
