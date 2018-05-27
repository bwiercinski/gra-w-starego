import {GameEndMessage, GameStateMessage, PlayerTurnMessage, StartGameMessage} from "../../model/messages";
import {GameState, PlayerType} from "../../model/model";
import {ActorFactory} from "../actors/actor-system";
import {ActorRef} from "js-actor";
import {MessagesFacade} from "./messages-facade";
import * as _ from 'lodash';


const readline = require('readline');

export interface GameConfig {
    p0?: PlayerType;
    p1?: PlayerType;
    size?: number;
}

export class RunnerMessagesFacade implements MessagesFacade {

    gameDirectorActor: ActorRef;

    startDate: Date;
    endDate: Date;

    gameConfig: GameConfig;

    constructor(gameConfig: GameConfig) {
        this.gameConfig = gameConfig;
    }

    resolve: (value?: (PromiseLike<GameState> | GameState)) => void;

    promiceStart(): Promise<GameState> {
        return new Promise<GameState>(resolve => {
            this.start()
            this.resolve = resolve;
        })
    }

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
                    type: this.gameConfig.p0
                },
                {
                    name: 'P1',
                    type: this.gameConfig.p1
                }
            ],
            size: this.gameConfig.size
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
        this.resolve(gameEndMessage.gameState)
        // const profile = profiler.stopProfiling('probe');
        // profile.export((err, result) => {
        //     fs.writeFileSync('nodehero.cpuprofile', result);
        //     profile.delete();
        // })
    }
}

const players = [PlayerType.HEURISTICS_DIFF_LDO,
    PlayerType.HEURISTICS_CORNERS_LDO,
    PlayerType.HEURISTICS_CIRCLE_LDO,
    PlayerType.HEURISTICS_DIFF_MF,
    PlayerType.HEURISTICS_CORNERS_MF,
    PlayerType.HEURISTICS_CIRCLE_MF];

const playerNames = {
    [PlayerType.HEURISTICS_DIFF_LDO]: "HEURISTICS_DIFF_LDO",
    [PlayerType.HEURISTICS_CORNERS_LDO]: "HEURISTICS_CORNERS_LDO",
    [PlayerType.HEURISTICS_CIRCLE_LDO]: "HEURISTICS_CIRCLE_LDO",
    [PlayerType.HEURISTICS_DIFF_MF]: "HEURISTICS_DIFF_MF",
    [PlayerType.HEURISTICS_CORNERS_MF]: "HEURISTICS_CORNERS_MF",
    [PlayerType.HEURISTICS_CIRCLE_MF]: "HEURISTICS_CIRCLE_MF"
};

function createGames(): GameConfig[] {
    let games: GameConfig[] = [];
    for (let i = 0; i < players.length; i++) {
        for (let j = 0; j < players.length; j++) {
            if (i != j) {
                games.push({p0: players[i], p1: players[j]})
            }
        }
    }
    return games;
}

async function runGameSync() {
    let playersPointsOdd: number[] = [];
    let playersPointsEven: number[] = [];
    let playersWins: number[] = [];
    players.forEach(player => {
        playersPointsOdd[player] = 0;
        playersPointsEven[player] = 0;
        playersWins[player] = 0;
    });

    let games: GameConfig[] = createGames();

    let consoleLog = console.log;
    console.log = () => null;

    for (const game of games) {

        game.size = 7;
        let gameState = await new RunnerMessagesFacade(game).promiceStart();
        let p0Points = gameState.players[0].playerPoints;
        let p1Points = gameState.players[1].playerPoints;

        playersPointsOdd[game.p0] += p0Points;
        playersPointsOdd[game.p1] += p1Points;
        playersWins[game.p0] += p0Points > p1Points ? 1 : 0;
        playersWins[game.p1] += p1Points > p0Points ? 1 : 0;

        consoleLog(`size: ${game.size} ${playerNames[game.p0]} vs ${playerNames[game.p1]}: ${p0Points} : ${p1Points} ${p0Points > p1Points ? playerNames[game.p0] : playerNames[game.p1]}_WINS`);

        game.size = 8;
        gameState = await new RunnerMessagesFacade(game).promiceStart();
        p0Points = gameState.players[0].playerPoints;
        p1Points = gameState.players[1].playerPoints;

        playersPointsEven[game.p0] += p0Points;
        playersPointsEven[game.p1] += p1Points;
        playersWins[game.p0] += p0Points > p1Points ? 1 : 0;
        playersWins[game.p1] += p1Points > p0Points ? 1 : 0;

        consoleLog(`size: ${game.size} ${playerNames[game.p0]} vs ${playerNames[game.p1]}: ${p0Points} : ${p1Points} ${p0Points > p1Points ? playerNames[game.p0] : playerNames[game.p1]}_WINS`);
    }

    console.log = consoleLog;
    console.log("results");
    for (const player of players) {
        console.log(playerNames[player], player,
            playersWins[player],
            playersPointsOdd[player],
            playersPointsEven[player]);
    }
}

runGameSync();