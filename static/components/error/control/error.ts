import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/error.tmp.js";

export default class ErrorShow extends Block {

    constructor( tag:string, props:any,template = componentTemplate ) {
        super(tag, props,template);
    }

}


