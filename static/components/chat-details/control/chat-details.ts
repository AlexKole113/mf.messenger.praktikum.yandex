import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/chat-details.tmp.js";

type ChatDetailsProps = {name: string, photo: string, lastTime: string, link: string}

export default class ChatDetails extends Block <ChatDetailsProps> {

    constructor( tag:string, props:ChatDetailsProps, template:template = componentTemplate ) {
        super( tag, props, template );
    }

}



