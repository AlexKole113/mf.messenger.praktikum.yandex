import Templator from "./class-Templator.js";
import Block from "./class-Block.js";
export default class Page extends Block {
    constructor(rootElement = 'main', template, components = {}) {
        super(rootElement, components);
        this._templateDef = template;
        this.components = components;
    }
    _registerEvents() {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(Page.PAGE_EVENTS.PAGE_WAS_RENDER, this._pageWasRender.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _render(temp = this._templateDef) {
        let templator = new Templator(temp);
        let renderedComponents = {};
        for (let component in this.components) {
            if (component === 'handlers')
                continue;
            renderedComponents[component] = this.components[component].getElement();
        }
        return templator.compile(renderedComponents);
    }
    _pageWasRender() {
        const allHandlers = this.props.handlers;
        if (allHandlers) {
            allHandlers.forEach((handler) => {
                for (let name in handler) {
                    if (name === 'render') {
                        handler[name]();
                    }
                }
            });
        }
    }
    render() {
        let html = this._render(this._templateDef);
        this.rootElm.innerHTML = html;
        let bodyElm = document.querySelector('body');
        bodyElm.append(this.rootElm);
        for (let prop in this.components) {
            if (prop === 'handlers')
                continue;
            this.components[prop].eventBus.emit(Block.EVENTS.FLOW_CDU);
        }
        this.eventBus.emit(Page.PAGE_EVENTS.PAGE_WAS_RENDER);
    }
}
Page.PAGE_EVENTS = {
    PAGE_WAS_RENDER: "page_render"
};
//# sourceMappingURL=class-Page.js.map