import {GameEndMessage} from "../../model/game-end-message";
import {GameState} from "../../model/game-state";
import {PlayerTurnMessage} from "../../model/player-turn-message";

export interface IMessagesFacade {

    start(): void;

    gameStateResponse(gameState: GameState): void;

    playerTurnMessage(playerTurnMessage: PlayerTurnMessage): void;

    gameEndMessage(gameEndMessage: GameEndMessage): void;
}
