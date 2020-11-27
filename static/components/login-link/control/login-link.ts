import Templator from "../../../global/classes/class-Templator";
import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/login-link.tmp";


type LoginLinkProps = {
    text: string,
    link: string,
}

export default class LoginLink extends Block <LoginLinkProps> {


    protected _templateDef !:template;
    protected rootElm      !:HTMLElement;
    protected props        !:LoginLinkProps;


    constructor( tag:string, props:LoginLinkProps, template:template = componentTemplate ) {
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


