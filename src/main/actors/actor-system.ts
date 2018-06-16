import {ActorRef, ActorSystem} from "js-actor";
import {IPlayer, PlayerType} from "../../model/model";
import {Heuristics} from "../engine/heuristics";
import {IMessagesFacade} from "../engine/i-messages-facade";
import {GamePlayer} from "../players/game-player";
import {HumanGamePlayer} from "../players/human-player";
import {MinmaxAbPlayer} from "../players/minmax-ab-player";
import {MinmaxPlayer} from "../players/minmax-player";
import {RandomGamePlayer} from "../players/random-player";
import {GameDirectorActor} from "./game-director.actor";
import {GamePlayerActor} from "./game-player.actor";

const system: ActorSystem = ActorSystem.create("GameSystem");

const heuristics = new Heuristics();

export class ActorFactory {
    public static createGameDirectorActor(messagesFacade: IMessagesFacade): ActorRef {
        return system.actorOf(new GameDirectorActor(messagesFacade));
    }

    public static createGameActor(player: IPlayer, messagesFacade: IMessagesFacade): ActorRef {
        return system.actorOf(
            new GamePlayerActor(player.name, this.createGamePlayerByPlayerType(player, messagesFacade)));
    }

    public static createGamePlayerByPlayerType(player: IPlayer, messagesFacade: IMessagesFacade): GamePlayer {
        switch (player.type) {
            case PlayerType.HUMAN:
                return new HumanGamePlayer(messagesFacade);
            case PlayerType.MINMAX:
                return new MinmaxPlayer(heuristics.maxDifference, 3);
            case PlayerType.MINMAX_AB:
                return new MinmaxAbPlayer(heuristics.maxDifference, 3, heuristics.leftDownOrder);
            case PlayerType.HEURISTICS_DIFF_LDO:
                return new MinmaxAbPlayer(
                    heuristics.maxDifference, 4,
                    heuristics.leftDownOrder);
            case PlayerType.HEURISTICS_CORNERS_LDO:
                return new MinmaxAbPlayer(
                    heuristics.maxDifferenceRespectCorners, 4,
                    heuristics.leftDownOrder);
            case PlayerType.HEURISTICS_CIRCLE_LDO:
                return new MinmaxAbPlayer(
                    heuristics.maxDifferenceRespectSecondCircle, 4,
                    heuristics.leftDownOrder);
            case PlayerType.HEURISTICS_DIFF_MF:
                return new MinmaxAbPlayer(
                    heuristics.maxDifference, 4,
                    heuristics.midFirst);
            case PlayerType.HEURISTICS_CORNERS_MF:
                return new MinmaxAbPlayer(
                    heuristics.maxDifferenceRespectCorners, 4,
                    heuristics.midFirst);
            case PlayerType.HEURISTICS_CIRCLE_MF:
                return new MinmaxAbPlayer(
                    heuristics.maxDifferenceRespectSecondCircle, 4,
                    heuristics.midFirst);
            case PlayerType.RANDOM:
                return new RandomGamePlayer();
            default:
                return null;
        }
    }
}
