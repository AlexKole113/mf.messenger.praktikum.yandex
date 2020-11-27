import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/search.tmp";

type SeacrhProps = {
    [key:string]: string
}


export default class Seacrh extends Block <SeacrhProps> {

    constructor( tag:string, props:SeacrhProps, template:template = componentTemplate ) {
        super(tag, props, template);
    }

}



