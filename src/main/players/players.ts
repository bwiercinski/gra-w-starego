import {GamePlayer, GameState, PlayerType} from "../../model/model";
import {ActorRef} from "js-actor";

export function createGamePlayerByPlayerType(playerType: PlayerType) {
    switch (playerType) {
        case PlayerType.HUMAN:
            return new HumanGamePlayer();
        case PlayerType.MINMAX:
            return new MinmaxGamePlayer();
        case PlayerType.MINMAX_AB:
            return new MinmaxAlphaBetaGamePlayer();
        case PlayerType.RANDOM:
            return new RandomGamePlayer();
        default:
            return null;
    }

}

export class HumanGamePlayer implements GamePlayer {
    makeMove(gameState: GameState, sender: ActorRef): Promise<void> {
        return undefined;
    }
}

export class MinmaxGamePlayer implements GamePlayer {
    makeMove(gameState: GameState, sender: ActorRef): Promise<void> {
        return undefined;
    }
}

export class MinmaxAlphaBetaGamePlayer implements GamePlayer {
    makeMove(gameState: GameState, sender: ActorRef): Promise<void> {
        return undefined;
    }
}

export class RandomGamePlayer implements GamePlayer {
    makeMove(gameState: GameState, sender: ActorRef): Promise<void> {
        return undefined;
    }
}