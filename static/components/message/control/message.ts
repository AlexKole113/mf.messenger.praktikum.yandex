import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import Delivered from "../../delivered/control/delivered.js";
import {componentTemplate} from "../view/message.tmp.js";
import EventBus from "../../../global/classes/class-EventBus";


type props = {
    [index:string]:any
};


export default class Message <T extends object> extends Block <T> {

    protected _element     :any        = null;
    protected _meta        !:{tagName:string,props:any};
    protected _templateDef !:template;
    protected rootElm      !:HTMLElement;
    protected props        !:props;
    public    handlers     ?:object;
    public    eventBus     !:EventBus;



    constructor( tag:string, props:props, template:template = componentTemplate ) {
        super(tag, props, template);
        this.actualize(props)
    }

    protected _getElement( temp:template = this._templateDef ) :string {
        let templator = new Templator( temp );

        let messageList = '';
        for(let i = 0; i < this.props.length; i++ ){
            messageList += templator.compile( this.props[i] )
        }

        this.rootElm.innerHTML = messageList;
        return this.rootElm.outerHTML;
    }


    public setProps (nextProps:props) {
        this.props = nextProps;

        for( let i=0; i < this.props.length; i++ ){
            ( this.props[i].user === 1 ) ? this.props[i].user = 'self' : this.props[i].user = 'other';
            if ( this.props[i].delivered === true ) {
                this.props[i].delivered = new Delivered('div',{}).getElement();
            } else {
                this.props[i].delivered = '';
            }
        }

        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    }

    public render( elm:string ) {
        if(!elm){
            elm = this._meta.tagName;
        }

        let templator = new Templator( this._templateDef );
        let messageList = '';
        for(let i = 0; i < this.props.length; i++ ){
            messageList += templator.compile( this.props[i] )
        }

        let elementTargetRender = <HTMLElement> document.querySelector( elm );
        elementTargetRender.innerHTML = messageList ;
    }

    public getElement( temp:template ) :string {
        return this._getElement( temp  )
    }

    public actualize( props:props ){
        if ( !props ) return;

        this.props = props;

        for( let i=0; i < this.props.length; i++ ){
            ( this.props[i].user === 1 ) ? this.props[i].user = 'self' : this.props[i].user = 'other';
            if ( this.props[i].delivered === true ) {
                this.props[i].delivered = new Delivered('div',{}).getElement()
            } else {
                this.props[i].delivered = '';
            }
        }

        return this;
    }

}



