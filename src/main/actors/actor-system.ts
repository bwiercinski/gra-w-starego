import {ActorRef, ActorSystem} from "js-actor";
import {GameDirectorActor} from "./game-director.actor";
import {GamePlayerActor} from "./game-player.actor";
import {Player, PlayerType} from "../../model/model";
import {RandomGamePlayer} from "../players/random-player";
import {HumanGamePlayer} from "../players/human-player";
import {GamePlayer} from "../players/game-player";
import {MinmaxPlayer} from "../players/minmax-player";
import {MinmaxAbPlayer} from "../players/minmax-ab-player";
import {MessagesFacade} from "../engine/messages-facade";
import {Heuristics} from "../engine/heuristics";

const system: ActorSystem = ActorSystem.create("GameSystem");

const heuristics = new Heuristics();

export class ActorFactory {
    public static createGameDirectorActor(messagesFacade: MessagesFacade): ActorRef {
        return system.actorOf(new GameDirectorActor(messagesFacade));
    }

    public static createGameActor(player: Player, messagesFacade: MessagesFacade): ActorRef {
        return system.actorOf(new GamePlayerActor(player.name, this.createGamePlayerByPlayerType(player, messagesFacade)));
    }

    public static createGamePlayerByPlayerType(player: Player, messagesFacade: MessagesFacade): GamePlayer {
        switch (player.type) {
            case PlayerType.HUMAN:
                return new HumanGamePlayer(messagesFacade);
            case PlayerType.MINMAX:
                return new MinmaxPlayer(heuristics.maxDifference, 3);
            case PlayerType.MINMAX_AB:
                return new MinmaxAbPlayer(heuristics.maxDifferenceRespectCorners, 4, heuristics.midFirst);
            case PlayerType.RANDOM:
                return new RandomGamePlayer;
            default:
                return null;
        }
    }
}
