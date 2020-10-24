import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/error.tmp.js";

export default class ErrorShow <T extends object> extends Block <T> {

    constructor( tag:string, props:props,template:template = componentTemplate ) {
        super(tag, props,template);
    }

}


