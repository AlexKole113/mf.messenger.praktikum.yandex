import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {loginLink} from "../view/login-link.tmp.js";


export default class LoginLink extends Block {
    constructor( tag:string, props:any ) {
        super(tag, props);
    }
    _templateDef = loginLink;

    getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

    _getElement( temp:any = this._templateDef ) :string {
        let templator = new Templator( temp );
        return templator.compile( this.props );
    }
}


