import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/attach-menu.tmp.js";


export default class AttachMenu extends Block {

    constructor( tag:string, props:any, template = componentTemplate ) {
        super(tag, props , template );
    }

}



