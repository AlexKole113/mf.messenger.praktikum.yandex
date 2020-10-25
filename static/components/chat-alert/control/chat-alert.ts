import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/chat-alert.tmp.js";

type ChatAlertProps = {
    alert_msg:string
}

export default class ChatAlert extends Block <ChatAlertProps> {

    constructor( tag:string, props:ChatAlertProps, template:template = componentTemplate ) {
        super( tag, props, template );
    }

}



