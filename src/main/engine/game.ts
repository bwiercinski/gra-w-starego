// import {ipcMain} from 'electron';
import {ActorFactory} from "../actors/actor-system";
import {ActorRef} from "js-actor";
import {ipcMain} from 'electron';


// create a message object

// create an actor
/*
class MyActor extends AbstractGameActor {
    public createReceive() {
        return this.receiveBuilder()
            .match(PingMessage, message => {
                console.log('Ping' + process.ppid + ' ' + process.pid);
                setTimeout(() => this.context.sender.tell(new PongMessage(), this.context.self), 1000);
            })
            .match(PongMessage, message => {
                console.log('Pong' + process.ppid + ' ' + process.pid);
                setTimeout(() => this.context.sender.tell(new PingMessage(), this.context.self), 1000);
            })
            .build()
    }
}
*/

// create an actor


export class Game {
    actorFactory: ActorFactory;
    gameDirectorActor: ActorRef;

    constructor() {
        this.gameDirectorActor = ActorFactory.createGameDirectorActor();
    }

    start() {
        // this.initMessages();
        // mount actor to system, return an ActorRef object

        // myactor is ready an listening, send message to it.
        // myActor1.tell(null);

    }

    initMessages() {
        ipcMain.on('asynchronous-message', (event, arg) => {
            console.log(arg);
            event.sender.send('asynchronous-reply', this.rec(0, 4))
        });

        ipcMain.on('synchronous-message', (event, arg) => {
            console.log(arg);
            event.returnValue = this.rec(0, 4);
        });
    }

    rec(counter: number, size: number): number {
        let a = 0;
        if (counter < size) {
            for (let i = 0; i < 100; i++) {
                if (counter < size) {
                    a = 1 + this.rec(counter + 1, size);
                } else {
                    return 0;
                }
            }
        }
        return a;
    }

}


export class Board {
    private readonly board: number[][];

    constructor(size: number) {
        this.board = new Array(size).fill(new Array(size).fill(0))
    }

    getCell(row: number, column: number): number {
        return this.board[row][column];
    }

    setCell(row: number, column: number, value: number): void {
        this.board[row][column] = value;
    }
}