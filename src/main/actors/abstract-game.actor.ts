import {AbstractActor} from "js-actor";
import {Message} from "../../model/messages";


export abstract class AbstractGameActor extends AbstractActor {

    messageDecorator(callback: (self: AbstractGameActor, message: Message) => void) {
        return (message: Message) => callback(this, message);
    }
}
