import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/chat-menu.tmp.js";


export default class ChatMenu extends Block {

    constructor( tag:string, props:any, template = componentTemplate ) {
        super(tag, props, template);
    }

}



