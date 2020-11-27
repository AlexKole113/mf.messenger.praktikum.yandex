import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/send-message-group.tmp";

type SendMessageGroupProps = {
    send_message: string,
    attach_menu : string,
    handlers:  { [key:string]: CallableFunction|any }[]
}


export default class SendMessageGroup extends Block <SendMessageGroupProps> {

    constructor( tag:string, props:SendMessageGroupProps, template:template = componentTemplate ) {
        super(tag, props, template);
    }

}



