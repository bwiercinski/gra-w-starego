import {ActorRef} from "js-actor";
import {GameState} from "../../model/game-state";
import {PlayerTurnMessage} from "../../model/player-turn-message";
import {IMessagesFacade} from "../engine/i-messages-facade";
import {GamePlayer} from "./game-player";

export class HumanGamePlayer extends GamePlayer {

    protected messagesFacade: IMessagesFacade;

    constructor(messagesFacade: IMessagesFacade) {
        super();
        this.messagesFacade = messagesFacade;
    }

    public makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void {
        console.log("HumanGamePlayer", gameState);
        this.messagesFacade.playerTurnMessage(new PlayerTurnMessage(gameState.nextPlayer, player));
    }
}
