import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/add-to-chat.tmp.js";

type DeliveredProps = {
    [key:string]:any
}

export default class AddToChat extends Block <DeliveredProps> {

    protected props        !:DeliveredProps;
    protected _templateDef !:template;
    public  rootElm        !:HTMLElement;

    constructor( tag:string, props:DeliveredProps, template:template = componentTemplate ) {
        super(tag, props, template);
    }


    public getElement( temp:template = this._templateDef ) :string {
        return super._getElement( temp  )
    }


}



