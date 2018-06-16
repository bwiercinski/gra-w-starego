import {ActorRef} from "js-actor";
import {GameState} from "../../model/game-state";
import {IBoardPosition} from "../../model/model";
import {MoveMadeMessage} from "../../model/move-made-message";
import {GamePlayer} from "./game-player";

export abstract class AiPlayer extends GamePlayer {
    public makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void {
        this.makeAiMove(gameState).then((position) => {
            sender.tell(new MoveMadeMessage(position, gameState.nextPlayer), player);
        });
    }

    protected abstract makeAiMove(gameState: GameState): Promise<IBoardPosition>;
}
