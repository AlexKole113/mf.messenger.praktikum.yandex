import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/attach-menu.tmp.js";

type AttachMenuProps = {
    [key:string]:string
}

export default class AttachMenu extends Block <AttachMenuProps>  {

    constructor( tag:string, props:AttachMenuProps, template:template = componentTemplate ) {
        super(tag, props , template );
    }

}



