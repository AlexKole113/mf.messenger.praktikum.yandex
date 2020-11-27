import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/menu-chat.tmp";

type ChatMenuProps = {
    [key:string] :any
}

export default class MenuChat extends Block <ChatMenuProps> {

    constructor( tag:string, props:ChatMenuProps, template:template = componentTemplate ) {
        super(tag, props, template);
    }

}



