import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/error.tmp.js";

type ErrorShowProps = {
    code: string,
    text: string,
}

export default class ErrorShow extends Block <ErrorShowProps> {

    constructor( tag:string, props:ErrorShowProps, template:template = componentTemplate ) {
        super(tag, props,template);
    }

}


