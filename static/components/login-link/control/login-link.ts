import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/login-link.tmp.js";


export default class LoginLink <T extends object> extends Block <T> {


    protected _templateDef !:template;
    protected rootElm      !:HTMLElement;
    protected props        !:props;


    constructor( tag:string, props:props, template:template = componentTemplate ) {
        super(tag, props, template);
    }

    protected _getElement( temp:template ) :string {
        let templator = new Templator( temp );
        return templator.compile( this.props );
    }


    public getElement( temp:template = this._templateDef  ) :string {
        return this._getElement( temp  )
    }

}


