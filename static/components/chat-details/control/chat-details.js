import Block from "../../../global/classes/class-Block.js";
import { chatDetails } from "../view/chat-details.tmp.js";
export default class ChatDetails extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = chatDetails;
    }
}
//# sourceMappingURL=chat-details.js.map