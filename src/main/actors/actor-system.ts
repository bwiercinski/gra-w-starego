import {ActorSystem, ActorRef} from "js-actor/bin";
import {GameDirectorActor} from "./game-director.actor";
import {GameConfig} from "../../model/model";

const system: ActorSystem = ActorSystem.create("GameSystem");

export class ActorFactory {
    createGameDirectorActor(gameConfig: GameConfig):ActorRef {
        return system.actorOf(new GameDirectorActor(gameConfig));
    }

    // createGameActor():ActorRef {
    //     return system.actorOf(new GameActor);
    // }
}