import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/send-message-group.tmp.js";


export default class SendMessageGroup extends Block {

    constructor( tag:string, props:any, template = componentTemplate ) {
        super(tag, props, template);
    }

}



