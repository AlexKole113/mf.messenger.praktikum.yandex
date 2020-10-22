import Block from "../../../global/classes/class-Block.js";
import { chatAlertTemplate } from "../view/chat-alert.tmp.js";
export default class ChatAlert extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = chatAlertTemplate;
    }
}
//# sourceMappingURL=chat-alert.js.map