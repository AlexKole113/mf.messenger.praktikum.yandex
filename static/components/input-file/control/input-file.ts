import Templator from "../../../global/classes/class-Templator";
import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/input-file.tmp";
import EventBus from "../../../global/classes/class-EventBus";


type InputFileProps = {
    name: string,
    [key:string]: string
}


export default class InputFile extends Block <InputFileProps> {

    protected _element     :any        = null;
    protected _meta        :any;
    protected _templateDef !:template;
    protected rootElm      !:HTMLElement;
    protected props        !:InputFileProps;
    public    handlers     ?:object;
    public    eventBus     !:EventBus;


    constructor( tag:string, props:InputFileProps, template:template = componentTemplate ) {
        super(tag, props,template);
    }

    protected _getElement( temp:template ) :string {
        let templator = new Templator( temp );
        let inputList = templator.compile( this.props )
        this.rootElm.innerHTML = inputList;
        return this.rootElm.outerHTML;
    }


    public setProps ( nextProps:InputFileProps ) {
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


