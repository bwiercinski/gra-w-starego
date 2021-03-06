import {BoardPosition, GameState} from "../../model/model";
import {AbstractGameActor} from "./abstract-game.actor";
import {
    GameEndMessage,
    GameStateMessage,
    MakeMoveMessage,
    MoveMadeMessage,
    StartGameMessage,
    StopGameMessage
} from "../../model/messages";
import {ActorFactory} from "./actor-system";
import {MessagesFacade} from "../engine/messages-facade";

export class GameDirectorActor extends AbstractGameActor {

    messagesFacade: MessagesFacade;

    gameState: GameState;

    constructor(messagesFacade: MessagesFacade) {
        super();
        this.messagesFacade = messagesFacade;
    }

    public createReceive() {
        return this.receiveBuilder()
            .match(StartGameMessage, this.messageDecorator(this.startGameMessage))
            .match(StopGameMessage, this.messageDecorator(this.stopGameMessage))
            .match(GameStateMessage, this.messageDecorator(this.gameStateMessage))
            .match(MoveMadeMessage, this.messageDecorator(this.moveMadeMessage))
            .build()
    }

    startGameMessage(self: GameDirectorActor, startGameMessage: StartGameMessage): void {
        self.gameState = new GameState(
            startGameMessage.gameConfig.size,
            startGameMessage.gameConfig.players.map(player => ({
                name: player.name,
                type: player.type,
                playerPoints: 0,
                actor: ActorFactory.createGameActor(player, self.messagesFacade)
            }))
        );
        setTimeout(() => {
            self.nextMove(self);
        }, 1700);

    }

    stopGameMessage(self: GameDirectorActor, stopGameMessage: StopGameMessage): void {
        console.log('STOP_GAME Message', stopGameMessage);
        self.gameState = null;
    }

    gameStateMessage(self: GameDirectorActor, gameStateMessage: GameStateMessage): void {
        console.log('GAME_STATE Message', gameStateMessage);
        self.messagesFacade.gameStateResponse(self.gameState);
    }

    moveMadeMessage(self: GameDirectorActor, moveMadeMessage: MoveMadeMessage): void {
         console.log('MOVE_MADE Message', moveMadeMessage);
        if (self.gameState && self.gameState.nextPlayer == moveMadeMessage.playerIndex &&
            self.gameState.board.isFreeByPosition(moveMadeMessage.position)) {

            self.makeMove(self, moveMadeMessage.position, self.gameState.nextPlayer);
            self.gameState.nextPlayer = +!self.gameState.nextPlayer;
            self.messagesFacade.gameStateResponse(self.gameState);
            if (!self.gameState.board.isFilled()) {
                setTimeout(() => self.nextMove(self), 100);
            } else {
                self.gameEndMessage(self);
            }
        }
    }

    nextMove(self: GameDirectorActor) {
        if (self.gameState && self.gameState.board) {
            self.gameState.players[self.gameState.nextPlayer].actor
                .tell(new MakeMoveMessage(self.gameState), self.getSelf());
        }
    }

    gameEndMessage(self: GameDirectorActor) {
        self.messagesFacade.gameEndMessage(new GameEndMessage(self.gameState));
    }

    makeMove(self: GameDirectorActor, position: BoardPosition, playerIndex: number) {
        let gameState = self.gameState;
        gameState.players[gameState.nextPlayer].playerPoints += gameState.board.givingPointsByPosition(position);
        gameState.board.setCellByPosition(position, playerIndex);
    }
}
