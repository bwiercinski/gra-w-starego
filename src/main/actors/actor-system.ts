import {ActorSystem, ActorRef} from "js-actor/bin";
import {GameDirectorActor} from "./game-director.actor";
import {GamePlayerActor} from "./game-player.actor";
import {createGamePlayerByPlayerType} from "../players/players";
import {Player} from "../../model/model";

const system: ActorSystem = ActorSystem.create("GameSystem");

export class ActorFactory {
    public static createGameDirectorActor(): ActorRef {
        return system.actorOf(new GameDirectorActor);
    }

    public static createGameActor(player: Player): ActorRef {
        return system.actorOf(new GamePlayerActor(player.name, createGamePlayerByPlayerType(player.type)));
    }
}