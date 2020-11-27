import Templator from "../../../global/classes/class-Templator";
import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/send-message.tmp";


type SendMessageProps = {
    [key:string] :string
}


export default class SendMessage extends Block <SendMessageProps> {

    protected _templateDef !:template;
    protected props        !:SendMessageProps;

    constructor( tag:string, props:SendMessageProps, template:template = componentTemplate ) {
        super( tag, props, template );
    }

    protected _getElement( temp:template = this._templateDef ) :string {
        let templator = new Templator( temp );
        return templator.compile( this.props );
    }


    public getElement( temp:template = this._templateDef  ) :string {
        return this._getElement( temp  )
    }

}


