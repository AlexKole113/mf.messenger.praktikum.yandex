import Block from "../../../global/classes/class-Block";
import { componentTemplate } from "../view/modal.tmp";
export default class Modal extends Block {
    constructor(tag, props, template = componentTemplate) {
        super(tag, props, template);
    }
    getElement(temp = this._templateDef) {
        return super._getElement(temp);
    }
}
//# sourceMappingURL=modal.js.map