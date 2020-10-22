import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {attachMenu} from "../view/attach-menu.tmp.js";


export default class AttachMenu extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = attachMenu;

}



