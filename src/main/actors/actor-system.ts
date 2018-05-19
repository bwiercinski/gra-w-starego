import {ActorSystem, ActorRef} from "js-actor/bin";
import {GameDirectorActor} from "./game-director.actor";
import {GamePlayerActor} from "./game-player.actor";
import {createGamePlayerByPlayerType} from "../players/players";
import {Player} from "../../model/model";
import {MessagesFacade} from "../engine/messages-facade";

const system: ActorSystem = ActorSystem.create("GameSystem");

export class ActorFactory {
    public static createGameDirectorActor(messagesFacade: MessagesFacade): ActorRef {
        return system.actorOf(new GameDirectorActor(messagesFacade));
    }

    public static createGameActor(player: Player): ActorRef {
        return system.actorOf(new GamePlayerActor(player.name, createGamePlayerByPlayerType(player)));
    }
}