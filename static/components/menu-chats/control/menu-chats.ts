import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/menu-chats.tmp.js";


type ChatMenuProps = {
    [key:string] :any
}

export default class MenuChats extends Block <ChatMenuProps> {

    constructor( tag:string, props:ChatMenuProps, template:template = componentTemplate ) {
        super(tag, props, template);
    }

}



