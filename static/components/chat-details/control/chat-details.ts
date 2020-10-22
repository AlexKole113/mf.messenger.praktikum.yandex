import Block from "../../../global/classes/class-Block.js";
import {chatDetails} from "../view/chat-details.tmp.js";


export default class ChatDetails extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = chatDetails;

}



