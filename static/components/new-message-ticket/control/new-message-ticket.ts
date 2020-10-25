import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/delivered.tmp.js";

type NewMessageTicketProps = {
    text: string,
}

export default class NewMessageTicket extends Block <NewMessageTicketProps> {

    constructor( tag:string, props:NewMessageTicketProps, template:template = componentTemplate ) {
        super(tag, props, template);
    }

}



