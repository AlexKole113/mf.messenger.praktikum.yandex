import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/chat-alert.tmp.js";


export default class ChatAlert extends Block {

    constructor( tag:string, props:any, template = componentTemplate ) {
        super( tag, props, template );
    }

}



