import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import {userTemplate} from "../view/user.tmp.js";


export default class UserList extends Block {
    constructor( tag:string, props:any, activeClass:string ) {
        super(tag, props);
        this.activeClass = activeClass;
        //this.setProps(props)
    }

    setProps( nextProps:object ) :object {
        if (!nextProps) return;

        this.props = nextProps;

        for(let i=0; i < this.props.length; i++ ){
            ( this.props[i].active === true ) ?  this.props[i].active = this.activeClass : this.props[i].active = '';
            ( this.props[i].msg_amount < 1 )  ?  this.props[i].msg_amount = '' : this.props[i].msg_amount;
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return this;
    }

    render( elm:string ) {
        if(!elm){
            elm = this._meta.tagName;
        }
        let templator = new Templator( userTemplate );
        let userList = '';
        for(let i = 0; i < this.props.length; i++ ){
            userList += templator.compile( this.props[i] )
        }
        document.querySelector(elm).innerHTML = userList ;
    }

    getElement( temp:any ) :string {
        return this._getElement( temp  )
    }

    _getElement( temp:any = userTemplate ) :string {
        let templator = new Templator( temp );

        let userList = '';
        for(let i = 0; i < this.props.length; i++ ){
            userList += templator.compile( this.props[i] )
        }

        this.rootElm.innerHTML = userList;
        return this.rootElm.outerHTML;

    }


}



