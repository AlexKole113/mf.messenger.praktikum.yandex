import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {searchTemplate} from "../view/search.tmp.js";


export default class Seacrh extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = searchTemplate;
}



