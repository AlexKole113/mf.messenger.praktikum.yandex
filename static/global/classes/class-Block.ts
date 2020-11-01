import EventBus from "./class-EventBus.js";
import Templator from "./class-Templator.js";


export default class Block <Block extends object> {

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "component-did-mount",
        FLOW_CDU: "component-did-update",
        FLOW_RENDER: "render"
    };


    protected _meta        :{tagName:string,props:any};
    protected _templateDef :string;
    protected rootElm      !:HTMLElement;
    protected props        :props;
    protected _element     :any;
    public    handlers     ?:object;
    public    eventBus     !:EventBus;


    protected constructor ( tagName:string = "div", props:props, templateDef:template = '' ) {

        this.eventBus = new EventBus();
        this.props = this._makePropsProxy( props );
        this._templateDef = templateDef;

        this._meta = {
            tagName,
            props
        };

        this._registerEvents();
        this.eventBus.emit(Block.EVENTS.INIT);

    }

    protected _registerEvents() {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) );
    }

    protected _createResources() {

        let rootElement = this._meta.tagName

        let root:string         = rootElement;
        let rootId:string       = ''
        let rootClasses:string  = '';

        //пока так(
        if( rootElement.indexOf('#') != -1 ){
            root    = rootElement.split('#')[0];
            rootId  = rootElement.split('#')[1].split('.')[0]
            rootElement = rootElement.substr(rootElement.indexOf('.'))
            if( rootElement.indexOf('.') !== -1 ) {
                let classes = rootElement.split('.');
                for( let i = 0; i < classes.length; i++ ){
                    rootClasses += `${classes[i]} `
                }
            }
        } else {
            if( rootElement.indexOf('.') !== -1 ) {
                root    = rootElement.split('.')[0];
                let classes = rootElement.split('.');
                for( let i = 1; i < classes.length; i++ ){
                    rootClasses += `${classes[i]} `
                }
            }
        }

        this.rootElm = document.createElement( root );
        this.rootElm.setAttribute('id', rootId );
        this.rootElm.setAttribute('class', rootClasses );
    }

    protected _componentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    protected _componentDidUpdate(){
        if( document.querySelector( this._meta.tagName ) ){
            this.render();
        }
        this._attachHandler();
    }

    protected _render( temp:any = this._templateDef ) :string {
        let templator = new Templator( temp );
        return templator.compile( this.props );
    }

    protected _attachHandler( elm:string = this._meta.tagName ) {

        if( Array.isArray( this.props.handlers ) ){
            for( let listner of this.props.handlers ) {
                for( let evName in listner ){
                    if( typeof listner[evName] !== "function") continue;
                    let elementHandlerTrget = <HTMLElement> document.querySelector( elm );
                    elementHandlerTrget.addEventListener( evName, listner[evName] )
                }
            }
        } else {
            for( let handler in this.props.handlers ) {
                if( typeof this.props.handlers[handler] !== "function") continue;
                let elementHandlerTrget = <HTMLElement> document.querySelector( elm );
                elementHandlerTrget.addEventListener( handler, this.props.handlers[handler] )
            }
        }
    }

    protected _makePropsProxy( props:props ) {
        // Еще один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        let proxyProps = new Proxy( self, {

            get( target:any, prop:string ) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('error');
                }
                return target[prop] ? target[prop] : props[prop];
            },

            set( target:any, prop:string, val:any ) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('error');
                }

                target[prop] = val;
                return target[prop];
            },

            deleteProperty() {
                throw new Error('error');
            },

        })

        return proxyProps;
    }

    protected _createDocumentElement(tagName:string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    protected _getElement( temp:string ) :string {
        let templator = new Templator( temp );
        let html = templator.compile( this.props );
        this.rootElm.innerHTML = html;
        return this.rootElm.outerHTML;
    }


    public init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    public setProps( nextProps:object|Block = {} ) :object {

        this.props = nextProps;
        Object.assign(this.props, nextProps);

        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    };

    get element() {
        return this._element;
    }

    public render( elm?:string, temp?:any ) {

        if(!elm) return;

        if( document.querySelector( this._meta.tagName ) ){

            let html = this._render( temp )
            let elementRenderTarg = <HTMLElement> document.querySelector( this._meta.tagName );
            elementRenderTarg .innerHTML = html ;
            if( this.props.handlers ){
                this._attachHandler(elm);
            }
        } else {
            let html = this._render( temp  )
            this.rootElm.innerHTML = html;

            let HtmlElement = <HTMLElement> document.querySelector( elm );
            HtmlElement.append( this.rootElm ) ;

            if( this.props.handlers ){
                this._attachHandler(elm);
            }
        }

    }

    public getContent() {
        return this.element;
    }

    public getElement( temp:any = this._templateDef ) :string {
        return this._getElement( temp  )
    }

}