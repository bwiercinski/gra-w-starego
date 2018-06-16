import {AbstractActor} from "js-actor";

export abstract class AbstractGameActor extends AbstractActor {

    protected messageDecorator(callback: (self: AbstractGameActor, message: any) => void) {
        return (message: any) => callback(this, message);
    }
}
