import Block from "../../../global/classes/class-Block";
import { componentTemplate } from "../view/remove-from-chat.tmp";
export default class RemoveFromChat extends Block {
    constructor(tag, props, template = componentTemplate) {
        super(tag, props, template);
    }
    getElement(temp = this._templateDef) {
        return super._getElement(temp);
    }
}
//# sourceMappingURL=remove-from-chat.js.map