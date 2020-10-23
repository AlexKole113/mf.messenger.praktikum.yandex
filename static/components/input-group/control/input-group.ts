import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/input-group.tmp.js";


export default class InputGroup extends Block {

    constructor( tag:string, props:any, selfClass:string, template = componentTemplate ) {
        super(tag, props ,template);
    }

    protected _getElement( temp:any = this._templateDef ) :string {
        let templator = new Templator( temp );

        let inputList = '';
        for(let i = 0; i < this.props.length; i++ ){
            inputList += templator.compile( this.props[i] )
        }

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

        let templator = new Templator( inputGroup );
        let inputList = '';
        for( let i = 0; i < this.props.length; i++ ){
            inputList += templator.compile( this.props[i] )
        }
        document.querySelector( elm ).innerHTML = inputList ;
    }

    public getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

}


