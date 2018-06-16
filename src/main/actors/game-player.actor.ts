import * as _ from "lodash";
import {MakeMoveMessage} from "../../model/make-move-message";
import {GamePlayer} from "../players/game-player";
import {AbstractGameActor} from "./abstract-game.actor";

export class GamePlayerActor extends AbstractGameActor {

    private name: string;

    private gamePlayer: GamePlayer;

    constructor(name: string, gamePlayer: GamePlayer) {
        super();
        this.name = name;
        this.gamePlayer = gamePlayer;
    }

    public createReceive() {
        return this.receiveBuilder()
            .match(MakeMoveMessage, this.messageDecorator(this.makeMoveMessage))
            .build();
    }

    public async makeMoveMessage(self: GamePlayerActor, makeMoveMessage: MakeMoveMessage) {
        await new Promise((resolve) => {
            self.gamePlayer.makeMove(_.cloneDeep(makeMoveMessage.gameState), self.getSender(), self.getSelf());
            resolve();
        });
    }
}
