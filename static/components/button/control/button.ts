import Templator from "../../../global/classes/class-Templator";
import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/button.tmp";


type ButtonProps = {
    text:string
}

export default class Button extends Block <ButtonProps> {

    protected _templateDef !:template;
    public props           !:props;

    constructor( tag:string, props:ButtonProps , template:template = componentTemplate) {
        super(tag, props, template );
    }

    protected _getElement( temp:template ) :string {
        let templator = new Templator( temp );
        return templator.compile( this.props );
    }

    public getElement( temp:template = this._templateDef ) :string {
        return this._getElement( temp  )
    }


}


