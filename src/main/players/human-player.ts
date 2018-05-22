import {PlayerTurnMessage} from "../../model/messages";
import {MessagesFacade} from "../engine/messages-facade";
import {ActorRef} from "js-actor";
import {GameState} from "../../model/model";
import {GamePlayer} from "./game-player";

export class HumanGamePlayer extends GamePlayer {

    messagesFacade: MessagesFacade;

    constructor(messagesFacade: MessagesFacade) {
        super();
        this.messagesFacade = messagesFacade;
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void {
        console.log('HumanGamePlayer', gameState);
        this.messagesFacade.playerTurnMessage(new PlayerTurnMessage(gameState.nextPlayer, player));
    }
}
