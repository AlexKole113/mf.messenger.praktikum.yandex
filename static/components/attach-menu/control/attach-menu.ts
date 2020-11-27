import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/attach-menu.tmp";

type AttachMenuProps = {
    [key:string]:string
}

export default class AttachMenu extends Block <AttachMenuProps>  {

    constructor( tag:string, props:AttachMenuProps, template:template = componentTemplate ) {
        super(tag, props , template );
    }

}



