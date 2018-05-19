import {AbstractActor} from "js-actor";
import {Message} from "../../model/messages";


export abstract class AbstractGameActor extends AbstractActor {

    messageDecorator(callback: (message: Message, self: AbstractGameActor) => void) {
        return (message: Message) => callback(message, this);
    }
}
