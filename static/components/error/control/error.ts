import Block from "../../../global/classes/class-Block.js";
import {errorTemplate} from "../view/error.tmp.js";

export default class ErrorShow extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = errorTemplate;

}


