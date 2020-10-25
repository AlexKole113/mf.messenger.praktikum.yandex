import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/input-group.tmp.js";
import EventBus from "../../../global/classes/class-EventBus";

type InputGroupProps = {
    type: string,
    name: string,
    label: string,

}[]

export default class InputGroup  extends Block <InputGroupProps> {

    protected _element     :any        = null;
    protected _meta        !:{tagName:string,props:any};
    protected _templateDef !:template;
    protected rootElm      !:HTMLElement;
    protected props        !:InputGroupProps;
    public    handlers     ?:object;
    public    eventBus     !:EventBus;


    constructor( tag:string, props:InputGroupProps, template:template = componentTemplate ) {
        super(tag, props ,template);
    }

    protected _getElement( temp:template ) :string {
        let templator = new Templator( temp );

        let inputList = '';
        for(let i = 0; i < this.props.length; i++ ){
            inputList += templator.compile( this.props[i] )
        }

        this.rootElm.innerHTML = inputList;
        return this.rootElm.outerHTML;
    }


    public setProps(nextProps:InputGroupProps) {
        this.props = nextProps;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    }

    public render( elm:string ) {
        if(!elm){
            elm = this._meta.tagName;
        }

        let templator = new Templator( this._templateDef );
        let inputList = '';
        for( let i = 0; i < this.props.length; i++ ){
            inputList += templator.compile( this.props[i] )
        }

        let elementRenderTarget = <HTMLElement> document.querySelector( elm );
        elementRenderTarget.innerHTML = inputList ;
    }

    public getElement( temp:string = this._templateDef ) :string {
        return this._getElement( temp  )
    }

}


