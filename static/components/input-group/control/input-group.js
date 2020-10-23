import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import { componentTemplate } from "../view/input-group.tmp.js";
export default class InputGroup extends Block {
    constructor(tag, props, selfClass, template = componentTemplate) {
        super(tag, props, template);
        this.setProps = nextProps => {
            if (!nextProps)
                return;
            this.props = nextProps;
            this.eventBus.emit(Block.EVENTS.FLOW_CDU);
            return this;
        };
    }
    _getElement(temp = this._templateDef) {
        let templator = new Templator(temp);
        let inputList = '';
        for (let i = 0; i < this.props.length; i++) {
            inputList += templator.compile(this.props[i]);
        }
        this.rootElm.innerHTML = inputList;
        return this.rootElm.outerHTML;
    }
    render(elm) {
        if (!elm) {
            elm = this._meta.tagName;
        }
        let templator = new Templator(inputGroup);
        let inputList = '';
        for (let i = 0; i < this.props.length; i++) {
            inputList += templator.compile(this.props[i]);
        }
        document.querySelector(elm).innerHTML = inputList;
    }
    getElement(temp) {
        return this._getElement(temp);
    }
}
//# sourceMappingURL=input-group.js.map