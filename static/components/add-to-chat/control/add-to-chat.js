import Block from "../../../global/classes/class-Block";
import { componentTemplate } from "../view/add-to-chat.tmp";
export default class AddToChat extends Block {
    constructor(tag, props, template = componentTemplate) {
        super(tag, props, template);
    }
    getElement(temp = this._templateDef) {
        return super._getElement(temp);
    }
}
//# sourceMappingURL=add-to-chat.js.map