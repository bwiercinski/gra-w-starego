import {PlayerTurnMessage} from "../../model/messages";
import {MessagesFacade} from "../engine/messages-facade";
import {GamePlayer} from "./players";
import {ActorRef} from "../../../node_modules/js-actor/bin";
import {GameState, Player} from "../../model/model";

export class HumanGamePlayer extends GamePlayer {

    messagesFacade: MessagesFacade;

    constructor(player: Player, messagesFacade: MessagesFacade) {
        super(player);
        this.messagesFacade = messagesFacade;
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void {
        console.log('HumanGamePlayer', gameState);
        this.messagesFacade.playerTurnMessage(new PlayerTurnMessage(gameState.nextPlayer, player));
    }
}
