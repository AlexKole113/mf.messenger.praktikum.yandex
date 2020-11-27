import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/delivered.tmp";

type NewMessageTicketProps = {
    text: string,
}

export default class NewMessageTicket extends Block <NewMessageTicketProps> {

    constructor( tag:string, props:NewMessageTicketProps, template:template = componentTemplate ) {
        super(tag, props, template);
    }

}



