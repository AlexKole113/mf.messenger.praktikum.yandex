import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/login-link.tmp.js";


export default class LoginLink extends Block {

    constructor( tag:string, props:any, template = componentTemplate ) {
        super(tag, props, template);
    }

    protected _getElement( temp:any = this._templateDef ) :string {
        let templator = new Templator( temp );
        return templator.compile( this.props );
    }


    public getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

}


