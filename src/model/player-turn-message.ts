import {ActorRef} from "js-actor";

export class PlayerTurnMessage {
    constructor(public playerIndex: number, public sender: ActorRef) {
    }
}
