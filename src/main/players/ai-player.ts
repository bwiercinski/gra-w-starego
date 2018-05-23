import {BoardPosition, GameState} from "../../model/model";
import {ActorRef} from "js-actor";
import {MoveMadeMessage} from "../../model/messages";
import {GamePlayer} from "./game-player";

export abstract class AiPlayer extends GamePlayer {
    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void {
        this.makeAiMove(gameState).then(position => {
            sender.tell(new MoveMadeMessage(position, gameState.nextPlayer), player);
        });
    }

    protected abstract makeAiMove(gameState: GameState): Promise<BoardPosition>
}