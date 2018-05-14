import {Actor, ActorSystem, createSystem} from "comedy";
import {ipcMain} from 'electron';

export class MyActor {
    selfActor: Actor;

    initialize(selfActor: Actor) {
        this.selfActor = selfActor;
    }

    sayHello(value: boolean, message: string) {
        console.log(`${value ? 'Ping' : 'Pong'} Hello "${message}" from ${process.pid}!`);

        new Promise((resolve) => setTimeout(resolve, 2000))
            // .then(() => self.selfActor.createChild(MyActor, {mode: 'forked'}))
            .then(() => this.selfActor.sendAndReceive('sayHello', !value, `message from ${process.pid}`))
            // .then(() => new Promise((resolve) => setTimeout(resolve, 2500)))
            // .then(() => this.selfActor.destroy())
    }
}

export const actorSystem: ActorSystem = createSystem({});

export class GameDirector {
    rootActor: Promise<Actor>;

    start() {
        this.initMessages();
        this.rootActor = actorSystem.rootActor();// Get a root actor reference.

        let promise1: Promise<Actor> = this.rootActor
            .then(rootActor => rootActor.createChild(MyActor, {mode: 'forked', clusterSize: 3}));
        promise1.then(myActor => myActor.sendAndReceive('sayHello', true, `message from ${process.pid}`));

        // promise2.then(reply => console.log(`Actor replied: ${reply}`))
        //     .catch(reason => console.log(reason))
        //     .finally(() => actorSystem.destroy());
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