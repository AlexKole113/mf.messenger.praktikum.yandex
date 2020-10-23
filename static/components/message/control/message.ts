import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import Delivered from "../../delivered/control/delivered.js";
import {componentTemplate} from "../view/message.tmp.js";



export default class Message extends Block {

    constructor( tag:string, props:any, selfClass:string, template = componentTemplate ) {
        super(tag, props, template);
        this.actualize(props)
    }

    protected _getElement( temp:any = this._templateDef ) :string {
        let templator = new Templator( temp );

        let messageList = '';
        for(let i = 0; i < this.props.length; i++ ){
            messageList += templator.compile( this.props[i] )
        }

        this.rootElm.innerHTML = messageList;
        return this.rootElm.outerHTML;
    }


    public setProps = nextProps => {
        if (!nextProps) return;

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
        document.querySelector( elm ).innerHTML = messageList ;
    }

    public getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

    public actualize( props ){
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



