import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import { inputGroup } from "../view/input-group.tmp.js";
export default class InputGroup extends Block {
    constructor(tag, props, selfClass) {
        super(tag, props);
        this.setProps = nextProps => {
            if (!nextProps)
                return;
            this.props = nextProps;
            this.eventBus().emit(Block.EVENTS.FLOW_CDU);
            return this;
        };
        //this.setProps(props)
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
    _getElement(temp = inputGroup) {
        let templator = new Templator(temp);
        let inputList = '';
        for (let i = 0; i < this.props.length; i++) {
            inputList += templator.compile(this.props[i]);
        }
        this.rootElm.innerHTML = inputList;
        return this.rootElm.outerHTML;
    }
}
//# sourceMappingURL=input-group.js.map