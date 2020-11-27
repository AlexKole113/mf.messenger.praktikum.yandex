import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/error.tmp";

type ErrorShowProps = {
    code: string,
    text: string,
}

export default class ErrorShow extends Block <ErrorShowProps> {

    constructor( tag:string, props:ErrorShowProps, template:template = componentTemplate ) {
        super(tag, props,template);
    }

}


