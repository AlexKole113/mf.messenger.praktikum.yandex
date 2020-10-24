import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/input-file.tmp.js";


export default class InputFile <T extends object> extends Block <T> {

    protected _element     :any        = null;
    protected _meta        :any;
    protected _templateDef !:template;
    protected rootElm      !:HTMLElement;
    protected props        !:props;
    public    handlers     ?:object;
    public    eventBus     ?:any;


    constructor( tag:string, props:props, template:template = componentTemplate ) {
        super(tag, props,template);
    }

    protected _getElement( temp:template ) :string {
        let templator = new Templator( temp );
        let inputList = templator.compile( this.props )
        this.rootElm.innerHTML = inputList;
        return this.rootElm.outerHTML;
    }


    public setProps ( nextProps:props) {
        this.props = nextProps;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    }

    public render( elm:string ) {
        if(!elm){
            elm = this._meta.tagName;
        }

        let templator = new Templator( this._templateDef );
        let inputList = templator.compile( this.props )

        let elementRenderTarget = <HTMLElement> document.querySelector( elm );
        elementRenderTarget.innerHTML = inputList ;
    }

    public getElement( temp:template = this._templateDef ) :string {
        return this._getElement( temp  )
    }

}


