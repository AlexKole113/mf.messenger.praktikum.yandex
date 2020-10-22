import Block from "../../../global/classes/class-Block.js";
import { sendMessageGroup } from "../view/send-message-group.tmp.js";
export default class SendMessageGroup extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = sendMessageGroup;
    }
}
//# sourceMappingURL=send-message-group.js.map