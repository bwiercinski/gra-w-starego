import {GameConfig, GameState} from "../../model/model";
import {AbstractGameActor} from "./abstract-game.actor";
import {
    GameConfigMessage,
    IpcMessage,
    IpcMessageType,
    MakeMoveMessage, Message,
    MoveMadeMessage,
    StartGameMessage
} from "../../model/messages";
import {MessagesFacade} from "../engine/messages-facade";

export class GameDirectorActor extends AbstractGameActor {

    messagesFacade: MessagesFacade;

    gameConfig: GameConfig;
    gameState: GameState;

    constructor(messagesFacade: MessagesFacade) {
        super();
        this.messagesFacade = messagesFacade;
    }

    public createReceive() {
        return this.receiveBuilder()
            .match(StartGameMessage, this.messageDecorator(this.startGameMessage))
            .match(GameConfigMessage, this.messageDecorator(this.gameConfigMessage))
            .match(MoveMadeMessage, this.messageDecorator(this.moveMadeMessage))
            .build()
    }

    startGameMessage(startGameMessage: StartGameMessage, self: GameDirectorActor): void {
        self.gameConfig = startGameMessage.gameConfig;
        self.gameState = new GameState(self.gameConfig.size, self.gameConfig.players);

        self.gameState.players[self.gameState.nextPlayer].actor
            .tell(new MakeMoveMessage(self.gameState), self.getSelf());
    }

    gameConfigMessage(gameConfigMessage: GameConfigMessage, self: GameDirectorActor): void {
        console.log('GAME_CONFIG RESPONSE', gameConfigMessage);
        self.messagesFacade.gameConfigResponse(self.gameConfig);
    }

    moveMadeMessage(moveMadeMessage: MoveMadeMessage, self: GameDirectorActor): void {
        console.log('MOVE_MADE RESPONSE', moveMadeMessage);
        self.gameState.board.isFree(moveMadeMessage.position)
    }
}
