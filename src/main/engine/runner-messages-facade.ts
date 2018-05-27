import {GameEndMessage, GameStateMessage, PlayerTurnMessage, StartGameMessage} from "../../model/messages";
import {GameState, PlayerType} from "../../model/model";
import {ActorFactory} from "../actors/actor-system";
import {ActorRef} from "js-actor";
import {MessagesFacade} from "./messages-facade";
import * as _ from 'lodash';
import * as profiler from 'v8-profiler';
import * as fs from "fs";


const readline = require('readline');

export class RunnerMessagesFacade implements MessagesFacade {

    gameDirectorActor: ActorRef;

    startDate: Date;
    endDate: Date;

    start() {
        this.startDate = new Date();
        this.gameDirectorActor = ActorFactory.createGameDirectorActor(this);
        this.initMessages();
        console.clear = () => {
            const blank = '\n'.repeat(process.stdout.rows);
            console.log(blank);
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
        }
    }

    initMessages() {
        this.gameDirectorActor.tell(new StartGameMessage({
            players: [
                {
                    name: 'P0',
                    type: PlayerType.MINMAX_AB
                },
                {
                    name: 'P1',
                    type: PlayerType.MINMAX_AB
                }
            ],
            size: 8
        }));
        this.gameDirectorActor.tell(new GameStateMessage);
    }

    gameStateResponse(gameState: GameState) {
        console.clear();
        gameState.board.board.forEach(row => {
            console.log(row.reduce((prev, cell) => prev + _.padStart(cell >= 0 ? cell : '_', 3), ''));
        });
        console.log({
            p0: gameState.players[0].playerPoints,
            p1: gameState.players[1].playerPoints,
            next1: gameState.nextPlayer
        });
    }

    playerTurnMessage(playerTurnMessage: PlayerTurnMessage) {
    }

    gameEndMessage(gameEndMessage: GameEndMessage): void {
        this.endDate = new Date();
        console.log(+this.endDate - +this.startDate);
        const profile = profiler.stopProfiling('probe');
        profile.export((err, result) => {
            fs.writeFileSync('nodehero.cpuprofile', result);
            profile.delete();
        })
    }
}

profiler.startProfiling('probe', true);
new RunnerMessagesFacade().start();
console.log('Datetest', new Date());