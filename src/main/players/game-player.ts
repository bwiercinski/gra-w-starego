import {ActorRef} from "js-actor";
import {GameState} from "../../model/game-state";

export abstract class GamePlayer {

    public abstract makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void;
}
