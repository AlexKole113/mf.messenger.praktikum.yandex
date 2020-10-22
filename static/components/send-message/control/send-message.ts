import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {sendMessage} from "../view/send-message.tmp.js";


export default class SendMessage extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = sendMessage;

    getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

    _getElement( temp:any = this._templateDef ) :string {
        let templator = new Templator( temp );
        return templator.compile( this.props );
    }
}


