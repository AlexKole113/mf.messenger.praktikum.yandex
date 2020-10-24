import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/delivered.tmp.js";


export default class Delivered <T extends object> extends Block <T> {

    protected props        !:props;
    protected _templateDef !:template;
    public  rootElm        !:HTMLElement;

    constructor( tag:string, props:props, template:template = componentTemplate ) {
        super(tag, props, template);
    }


    public getElement( temp:template = this._templateDef ) :string {
        return super._getElement( temp  )
    }


}



