import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/input-file.tmp.js";


export default class InputFile extends Block {

    constructor( tag:string, props:any, template = componentTemplate ) {
        super(tag, props,template);
    }

    protected _getElement( temp:any = this._templateDef ) :string {
        let templator = new Templator( temp );
        let inputList = templator.compile( this.props )
        this.rootElm.innerHTML = inputList;
        return this.rootElm.outerHTML;
    }


    public setProps = nextProps => {
        if (!nextProps) return;

        this.props = nextProps;

        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    }

    public render( elm:string ) {
        if(!elm){
            elm = this._meta.tagName;
        }

        let templator = new Templator( inputfile );
        let inputList = templator.compile( this.props )
        document.querySelector( elm ).innerHTML = inputList ;
    }

    public getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

}


