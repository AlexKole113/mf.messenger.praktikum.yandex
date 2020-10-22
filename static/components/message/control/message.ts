import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {message} from "../view/message.tmp.js";
import {delivered} from "../../delivered/view/delivered.tmp.js";


export default class Message extends Block {
    constructor( tag:string, props:any, selfClass:string ) {
        super(tag, props);
        this.actualize(props)
    }


    setProps = nextProps => {
        if (!nextProps) return;

        this.props = nextProps;

        for( let i=0; i < this.props.length; i++ ){
            ( this.props[i].user === 1 ) ? this.props[i].user = 'self' : this.props[i].user = 'other';
            ( this.props[i].delivered === true ) ? this.props[i].delivered = delivered : this.props[i].delivered = '';
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return this;
    }

    render( elm:string ) {
        if(!elm){
            elm = this._meta.tagName;
        }

        let templator = new Templator( message );
        let messageList = '';
        for(let i = 0; i < this.props.length; i++ ){
            messageList += templator.compile( this.props[i] )
        }
        document.querySelector( elm ).innerHTML = messageList ;
    }

    getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

    _getElement( temp:any = message ) :string {
        let templator = new Templator( temp );

        let messageList = '';
        for(let i = 0; i < this.props.length; i++ ){
            messageList += templator.compile( this.props[i] )
        }

        this.rootElm.innerHTML = messageList;
        return this.rootElm.outerHTML;
    }


    actualize( props ){
        if ( !props ) return;

        this.props = props;

        for( let i=0; i < this.props.length; i++ ){
            ( this.props[i].user === 1 ) ? this.props[i].user = 'self' : this.props[i].user = 'other';
            ( this.props[i].delivered === true ) ? this.props[i].delivered = delivered : this.props[i].delivered = '';
        }

        //this.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return this;
    }

}



