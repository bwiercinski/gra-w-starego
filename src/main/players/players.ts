import {GameState, Player} from "../../model/model";
import {ActorRef} from "js-actor";


export abstract class GamePlayer {

    player: Player;

    protected constructor(player: Player) {
        this.player = player;
    }

    abstract makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void
}


export class MinmaxGamePlayer extends GamePlayer {

    constructor(player: Player) {
        super(player);
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void {
        console.log('MinmaxGamePlayer', gameState);
    }
}

export class MinmaxAlphaBetaGamePlayer extends GamePlayer {

    constructor(player: Player) {
        super(player);
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void {
        console.log('MinmaxAlphaBetaGamePlayer', gameState);
    }
}

