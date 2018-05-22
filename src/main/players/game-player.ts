import {GameState} from "../../model/model";
import {ActorRef} from "js-actor";

export abstract class GamePlayer {

    abstract makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void
}
