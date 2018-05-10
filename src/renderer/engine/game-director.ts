import {ActorSystem, createSystem} from "comedy";

class MyActor {
    sayHello(to) {
        // Reply with a message, containing self PID.
        return `Hello to ${to} from ${process.pid}!`;
    }
}

export const actorSystem: ActorSystem = createSystem({});

export class GameDirector {
    start() {
        actorSystem
        // Get a root actor reference.
            .rootActor()
            // Create a class-defined child actor, that is run in a separate process (forked mode).
            .then(rootActor => rootActor.createChild(MyActor, {mode: 'forked'}))
            // Send a message to our forked actor with a self process PID.
            .then(myActor => myActor.sendAndReceive('sayHello', process.pid))
            .then(reply => {
                // Output result.
                console.log(`Actor replied: ${reply}`);
            }).catch(reason => console.log(reason))

            // Destroy the system, killing all actor processes.
            .finally(() => actorSystem.destroy());
    }
}

new GameDirector().start();

