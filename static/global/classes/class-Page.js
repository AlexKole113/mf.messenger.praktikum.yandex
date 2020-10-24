import Templator from "./class-Templator.js";
import Block from "./class-Block.js";
export default class Page extends Block {
    constructor(rootElement = 'main', template, components = {}) {
        super(rootElement, components);
        this._templateDef = template;
        this.components = components;
    }
    _render(temp = this._templateDef) {
        let templator = new Templator(temp);
        let renderedComponents = {};
        for (let component in this.components) {
            renderedComponents[component] = this.components[component].getElement();
        }
        return templator.compile(renderedComponents);
    }
    render() {
        let html = this._render(this._templateDef);
        this.rootElm.innerHTML = html;
        let bodyElm = document.querySelector('body');
        bodyElm.append(this.rootElm);
        for (let prop in this.components) {
            this.components[prop].eventBus.emit(Block.EVENTS.FLOW_CDU);
        }
    }
}
//# sourceMappingURL=class-Page.js.map