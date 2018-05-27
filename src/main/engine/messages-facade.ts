import {GameState} from "../../model/model";
import {GameEndMessage, PlayerTurnMessage} from "../../model/messages";

export interface MessagesFacade {

    start(): void;

    gameStateResponse(gameState: GameState): void;

    playerTurnMessage(playerTurnMessage: PlayerTurnMessage): void;

    gameEndMessage(gameEndMessage: GameEndMessage): void;
}