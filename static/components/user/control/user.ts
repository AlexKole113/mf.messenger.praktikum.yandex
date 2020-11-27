import Templator from "../../../global/classes/class-Templator";
import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/user.tmp";
import EventBus from "../../../global/classes/class-EventBus";


export default class UserList extends Block <UserListProps> {

    protected _element     :any        = null;
    protected _meta        !:{tagName:string,props:any};
    protected _templateDef !:template;
    protected rootElm      !:HTMLElement;
    protected props        !:UserListProps;
    public    handlers     ?:object;
    public    eventBus     !:EventBus;
    public    activeClass  :string


    constructor( tag:string, props:UserListProps, activeClass:string, template:template = componentTemplate ) {
        super(tag, props,template);
        this.activeClass = activeClass;
    }

    protected _getElement( temp:template = this._templateDef ) :string {
        let templator = new Templator( temp );

        let userList = '';
        for(let i = 0; i < this.props.length; i++ ){
            userList += templator.compile( this.props[i] )
        }

        this.rootElm.innerHTML = userList;
        return this.rootElm.outerHTML;

    }


    public setProps( nextProps:UserListProps ) :object {
       // if (!nextProps) return;

        this.props = nextProps;

        for(let i=0; i < this.props.length; i++ ){
            ( this.props[i].active === true ) ?  this.props[i].active = this.activeClass : this.props[i].active = '';
            //( this.props[i].msg_amount < 1 )  ?  this.props[i].msg_amount = '' : this.props[i].msg_amount;
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

        let elementRenderTarget = <HTMLElement> document.querySelector(elm);

        elementRenderTarget.innerHTML = userList ;
    }

    public getElement( temp:template ) :string {
        return this._getElement( temp  )
    }

}



