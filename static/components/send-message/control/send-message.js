import Templator from "../../../global/classes/class-Templator";
import Block from "../../../global/classes/class-Block";
import { componentTemplate } from "../view/send-message.tmp";
export default class SendMessage extends Block {
    constructor(tag, props, template = componentTemplate) {
        super(tag, props, template);
    }
    _getElement(temp = this._templateDef) {
        let templator = new Templator(temp);
        return templator.compile(this.props);
    }
    getElement(temp = this._templateDef) {
        return this._getElement(temp);
    }
}
//# sourceMappingURL=send-message.js.map