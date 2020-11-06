import Templator from "./class-Templator.js";
import Block from "./class-Block.js";


export default class Page <T extends object> extends Block <T> {

    static EVENTS = {
        PAGE_WAS_RENDER: "page_render"
    };

    protected _templateDef :string;

    public    rootElm      !:HTMLElement;
    public    components   :props;

    constructor( rootElement:string ='main', template:string, components:object = {} ) {

        super( rootElement, components );
        this._templateDef = template;
        this.components   = components;

    }

    protected _registerEvents() {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(Page.EVENTS.PAGE_WAS_RENDER, this._pageWasRender.bind(this) );
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) );
    }


    protected _render( temp:any = this._templateDef ) {
        let templator = new Templator( temp );
        let renderedComponents:props = {}

        for( let component in this.components ){
            if(component === 'handlers' ) continue;
            renderedComponents[component] = this.components[component].getElement()
        }

        return templator.compile( renderedComponents );
    }

    protected _pageWasRender() {
        const allHandlers = this.props.handlers;
        if( allHandlers ){
            allHandlers.forEach( ( handler ) => {
                for( let name in handler ) {
                    if( name === 'render' ){
                        handler[name]();
                    }
                }
            })
        }
    }

    public render() {
        let html = this._render( this._templateDef  );
        this.rootElm.innerHTML = html;
        let bodyElm = <HTMLElement> document.querySelector('body');
        bodyElm .append( this.rootElm )
        for( let prop in this.components ) {
            if( prop === 'handlers' ) continue;
            this.components[prop].eventBus.emit(Block.EVENTS.FLOW_CDU )
        }

        this.eventBus.emit(Page.EVENTS.PAGE_WAS_RENDER);
    }


}