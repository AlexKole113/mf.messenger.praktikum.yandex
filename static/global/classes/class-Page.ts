import Templator from "./class-Templator.js";
import Block from "./class-Block.js";


export default class Page <T extends object> extends Block <T> {

    protected _templateDef :string;

    public    rootElm      !:HTMLElement;
    public    components   :props;

    constructor( rootElement:string ='main', template:string, components:object = {} ) {

        super( rootElement, components );
        this._templateDef = template;
        this.components = components;
    }

    protected _render( temp:any = this._templateDef ) {
        let templator = new Templator( temp );
        let renderedComponents:props = {}

        for( let component in this.components ){
            renderedComponents[component] = this.components[component].getElement()
        }

        return templator.compile( renderedComponents );

    }

    public render() {
        let html = this._render( this._templateDef  );
        this.rootElm.innerHTML = html;
        let bodyElm = <HTMLElement> document.querySelector('body');
        bodyElm .append( this.rootElm )
        for( let prop in this.components ) {
            this.components[prop].eventBus.emit(Block.EVENTS.FLOW_CDU )
        }
    }
}