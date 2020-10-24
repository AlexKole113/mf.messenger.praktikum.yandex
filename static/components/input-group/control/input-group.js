import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import { componentTemplate } from "../view/input-group.tmp.js";
export default class InputGroup extends Block {
    constructor(tag, props, template = componentTemplate) {
        super(tag, props, template);
        this._element = null;
    }
    _getElement(temp) {
        let templator = new Templator(temp);
        let inputList = '';
        for (let i = 0; i < this.props.length; i++) {
            inputList += templator.compile(this.props[i]);
        }
        this.rootElm.innerHTML = inputList;
        return this.rootElm.outerHTML;
    }
    setProps(nextProps) {
        this.props = nextProps;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    }
    render(elm) {
        if (!elm) {
            elm = this._meta.tagName;
        }
        let templator = new Templator(this._templateDef);
        let inputList = '';
        for (let i = 0; i < this.props.length; i++) {
            inputList += templator.compile(this.props[i]);
        }
        let elementRenderTarget = document.querySelector(elm);
        elementRenderTarget.innerHTML = inputList;
    }
    getElement(temp = this._templateDef) {
        return this._getElement(temp);
    }
}
//# sourceMappingURL=input-group.js.map