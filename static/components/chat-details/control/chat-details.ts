import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/chat-details.tmp.js";


export default class ChatDetails extends Block {

    constructor( tag:string, props:any, template = componentTemplate ) {
        super( tag, props, template );
    }

}



