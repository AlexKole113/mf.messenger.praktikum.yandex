import Block from "../../../global/classes/class-Block.js";
import { componentTemplate } from "../view/modal.tmp.js";
export default class Modal extends Block {
    constructor(tag, props, template = componentTemplate) {
        super(tag, props, template);
    }
    getElement(temp = this._templateDef) {
        return super._getElement(temp);
    }
}
//# sourceMappingURL=modal.js.map