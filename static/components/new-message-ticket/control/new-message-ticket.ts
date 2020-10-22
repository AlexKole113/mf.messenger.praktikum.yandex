import Block from "../../../global/classes/class-Block.js";
import {delivered} from "../view/delivered.tmp.js";


export default class NewMessageTicket extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = delivered;
}



