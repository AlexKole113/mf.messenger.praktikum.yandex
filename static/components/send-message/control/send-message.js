import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import { sendMessage } from "../view/send-message.tmp.js";
export default class SendMessage extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = sendMessage;
    }
    getElement(temp) {
        return this._getElement(temp);
    }
    _getElement(temp = this._templateDef) {
        let templator = new Templator(temp);
        return templator.compile(this.props);
    }
}
//# sourceMappingURL=send-message.js.map