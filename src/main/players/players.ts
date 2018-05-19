import {GameState, Player, PlayerType} from "../../model/model";
import {ActorRef} from "js-actor";

export function createGamePlayerByPlayerType(player: Player) {
    switch (player.type) {
        case PlayerType.HUMAN:
            return new HumanGamePlayer(player);
        case PlayerType.MINMAX:
            return new MinmaxGamePlayer(player);
        case PlayerType.MINMAX_AB:
            return new MinmaxAlphaBetaGamePlayer(player);
        case PlayerType.RANDOM:
            return new RandomGamePlayer(player);
    }
}

export abstract class GamePlayer {

    player: Player;

    protected constructor(player: Player) {
        this.player = player;
    }

    abstract makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): Promise<void>
}

export class HumanGamePlayer extends GamePlayer {

    constructor(player: Player) {
        super(player);
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): Promise<void> {
        console.log('HumanGamePlayer', gameState);
        return undefined;
    }
}

export class MinmaxGamePlayer extends GamePlayer {

    constructor(player: Player) {
        super(player);
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): Promise<void> {
        console.log('MinmaxGamePlayer', gameState);
        return undefined;
    }
}

export class MinmaxAlphaBetaGamePlayer extends GamePlayer {

    constructor(player: Player) {
        super(player);
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): Promise<void> {
        console.log('MinmaxAlphaBetaGamePlayer', gameState);
        return undefined;
    }
}

export class RandomGamePlayer extends GamePlayer {

    constructor(player: Player) {
        super(player);
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): Promise<void> {
        console.log('RandomGamePlayer', gameState);
        return undefined;
    }
}