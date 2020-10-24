import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/send-message.tmp.js";


export default class SendMessage <T extends object> extends Block <T> {

    protected _templateDef !:template;
    protected props        !:props;

    constructor( tag:string, props:any, template:template = componentTemplate ) {
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


