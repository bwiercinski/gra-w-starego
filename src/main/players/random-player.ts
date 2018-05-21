import {GamePlayer} from "./players";
import {MoveMadeMessage} from "../../model/messages";
import {ActorRef} from "js-actor";
import {GameState, Player} from "../../model/model";
import * as _ from 'lodash';

export class RandomGamePlayer extends GamePlayer {

    constructor(player: Player) {
        super(player);
    }

    makeMove(gameState: GameState, sender: ActorRef, player: ActorRef): void {
        console.log('RandomGamePlayer', gameState);
        setTimeout(() => {
            let randomFreeField = _.sample(gameState.board.board
                .reduce((acc, val) => acc.concat(val), [])
                .reduce((prev, curr, index) => {
                    if (curr == -1) prev.push(index);
                    return prev;
                }, []));
            sender.tell(new MoveMadeMessage({
                row: Math.floor(randomFreeField / gameState.size),
                column: Math.floor(randomFreeField % gameState.size)
            }, gameState.nextPlayer), player);
        }, 1000);
    }
}