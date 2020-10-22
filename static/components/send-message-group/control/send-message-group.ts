import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {sendMessageGroup} from "../view/send-message-group.tmp.js";


export default class SendMessageGroup extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = sendMessageGroup;
}



