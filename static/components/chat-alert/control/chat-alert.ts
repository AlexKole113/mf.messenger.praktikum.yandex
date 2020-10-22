import Block from "../../../global/classes/class-Block.js";
import {chatAlertTemplate} from "../view/chat-alert.tmp.js";


export default class ChatAlert extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = chatAlertTemplate;
}



