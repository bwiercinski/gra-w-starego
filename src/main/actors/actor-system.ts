import {ActorRef, ActorSystem} from "js-actor/bin";
import {GameDirectorActor} from "./game-director.actor";
import {GamePlayerActor} from "./game-player.actor";
import {GamePlayer, MinmaxAlphaBetaGamePlayer, MinmaxGamePlayer} from "../players/players";
import {Player, PlayerType} from "../../model/model";
import {MessagesFacade} from "../engine/messages-facade";
import {RandomGamePlayer} from "../players/random-player";
import {HumanGamePlayer} from "../players/human-player";

const system: ActorSystem = ActorSystem.create("GameSystem");

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
                return new HumanGamePlayer(player, messagesFacade);
            case PlayerType.MINMAX:
                return new MinmaxGamePlayer(player);
            case PlayerType.MINMAX_AB:
                return new MinmaxAlphaBetaGamePlayer(player);
            case PlayerType.RANDOM:
                return new RandomGamePlayer(player);
        }
    }
}