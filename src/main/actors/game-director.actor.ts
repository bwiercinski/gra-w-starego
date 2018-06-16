import {GameEndMessage} from "../../model/game-end-message";
import {GameState} from "../../model/game-state";
import {GameStateMessage} from "../../model/game-state-message";
import {MakeMoveMessage} from "../../model/make-move-message";
import {IBoardPosition} from "../../model/model";
import {MoveMadeMessage} from "../../model/move-made-message";
import {StartGameMessage} from "../../model/start-game-message";
import {StopGameMessage} from "../../model/stop-game-message";
import {IMessagesFacade} from "../engine/i-messages-facade";
import {AbstractGameActor} from "./abstract-game.actor";
import {ActorFactory} from "./actor-system";

export class GameDirectorActor extends AbstractGameActor {

    private messagesFacade: IMessagesFacade;

    private gameState: GameState;

    constructor(messagesFacade: IMessagesFacade) {
        super();
        this.messagesFacade = messagesFacade;
    }

    public createReceive() {
        return this.receiveBuilder()
            .match(StartGameMessage, this.messageDecorator(this.startGameMessage))
            .match(StopGameMessage, this.messageDecorator(this.stopGameMessage))
            .match(GameStateMessage, this.messageDecorator(this.gameStateMessage))
            .match(MoveMadeMessage, this.messageDecorator(this.moveMadeMessage))
            .build();
    }

    public startGameMessage(self: GameDirectorActor, startGameMessage: StartGameMessage): void {
        self.gameState = new GameState(
            startGameMessage.gameConfig.size,
            startGameMessage.gameConfig.players.map((player) => ({
                actor: ActorFactory.createGameActor(player, self.messagesFacade),
                name: player.name,
                playerPoints: 0,
                type: player.type,
            })),
        );
        setTimeout(() => {
            self.nextMove(self);
        }, 1700);

    }

    public stopGameMessage(self: GameDirectorActor, stopGameMessage: StopGameMessage): void {
        console.log("STOP_GAME IMessage", stopGameMessage);
        self.gameState = null;
    }

    public gameStateMessage(self: GameDirectorActor, gameStateMessage: GameStateMessage): void {
        console.log("GAME_STATE IMessage", gameStateMessage);
        self.messagesFacade.gameStateResponse(self.gameState);
    }

    public moveMadeMessage(self: GameDirectorActor, moveMadeMessage: MoveMadeMessage): void {
         console.log("MOVE_MADE IMessage", moveMadeMessage);
         if (self.gameState && self.gameState.nextPlayer === moveMadeMessage.playerIndex &&
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

    public nextMove(self: GameDirectorActor) {
        if (self.gameState && self.gameState.board) {
            self.gameState.players[self.gameState.nextPlayer].actor
                .tell(new MakeMoveMessage(self.gameState), self.getSelf());
        }
    }

    public gameEndMessage(self: GameDirectorActor) {
        self.messagesFacade.gameEndMessage(new GameEndMessage(self.gameState));
    }

    public makeMove(self: GameDirectorActor, position: IBoardPosition, playerIndex: number) {
        const gameState = self.gameState;
        gameState.players[gameState.nextPlayer].playerPoints += gameState.board.givingPointsByPosition(position);
        gameState.board.setCellByPosition(position, playerIndex);
    }
}
