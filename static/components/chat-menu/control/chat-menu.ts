import Block from "../../../global/classes/class-Block.js";
import {chatMenu} from "../view/chat-menu.tmp.js";


export default class ChatMenu extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = chatMenu;

}



