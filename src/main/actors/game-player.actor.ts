import {AbstractGameActor} from "./abstract-game.actor";
import {MakeMoveMessage} from "../../model/messages";
import {GamePlayer} from "../players/players";
import * as _ from 'lodash';

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

    makeMoveMessage(self: GamePlayerActor, makeMoveMessage: MakeMoveMessage): void {
        setTimeout(() => {
            self.gamePlayer.makeMove(_.cloneDeep(makeMoveMessage.gameState), self.getSender(), self.getSelf())
        }, 0);
    }
}
