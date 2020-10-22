import Block from "../../../global/classes/class-Block.js";
import { chatMenu } from "../view/chat-menu.tmp.js";
export default class ChatMenu extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = chatMenu;
    }
}
//# sourceMappingURL=chat-menu.js.map