import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import { inputfile } from "../view/input-file.tmp.js";
export default class InputFile extends Block {
    constructor(tag, props) {
        super(tag, props);
        this.setProps = nextProps => {
            if (!nextProps)
                return;
            this.props = nextProps;
            this.eventBus().emit(Block.EVENTS.FLOW_CDU);
            return this;
        };
    }
    render(elm) {
        if (!elm) {
            elm = this._meta.tagName;
        }
        let templator = new Templator(inputfile);
        let inputList = templator.compile(this.props);
        document.querySelector(elm).innerHTML = inputList;
    }
    getElement(temp) {
        return this._getElement(temp);
    }
    _getElement(temp = inputfile) {
        let templator = new Templator(temp);
        let inputList = templator.compile(this.props);
        this.rootElm.innerHTML = inputList;
        return this.rootElm.outerHTML;
    }
}
//# sourceMappingURL=input-file.js.map