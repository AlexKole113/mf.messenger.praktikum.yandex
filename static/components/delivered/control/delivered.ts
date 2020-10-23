import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/delivered.tmp.js";


export default class Delivered extends Block {

    constructor( tag:string, props:any, template = componentTemplate ) {
        super(tag, props, template);
    }

}



