import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import { buttonTemplate } from "../view/button.tmp.js";
export default class Button extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = buttonTemplate;
    }
    getElement(temp) {
        return this._getElement(temp);
    }
    _getElement(temp = this._templateDef) {
        let templator = new Templator(temp);
        return templator.compile(this.props);
    }
}
//# sourceMappingURL=button.js.map