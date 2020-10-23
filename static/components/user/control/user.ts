import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/user.tmp.js";


export default class UserList extends Block {

    constructor( tag:string, props:any, activeClass:string, template = componentTemplate ) {
        super(tag, props,template);
        this.activeClass = activeClass;
    }

    protected _getElement( temp:any = this._templateDef ) :string {
        let templator = new Templator( temp );

        let userList = '';
        for(let i = 0; i < this.props.length; i++ ){
            userList += templator.compile( this.props[i] )
        }

        this.rootElm.innerHTML = userList;
        return this.rootElm.outerHTML;

    }


    public setProps( nextProps:object ) :object {
        if (!nextProps) return;

        this.props = nextProps;

        for(let i=0; i < this.props.length; i++ ){
            ( this.props[i].active === true ) ?  this.props[i].active = this.activeClass : this.props[i].active = '';
            ( this.props[i].msg_amount < 1 )  ?  this.props[i].msg_amount = '' : this.props[i].msg_amount;
        }

        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    }

    public render( elm:string ) {
        if(!elm){
            elm = this._meta.tagName;
        }
        let templator = new Templator( this._templateDef );
        let userList = '';
        for(let i = 0; i < this.props.length; i++ ){
            userList += templator.compile( this.props[i] )
        }
        document.querySelector(elm).innerHTML = userList ;
    }

    public getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

}



