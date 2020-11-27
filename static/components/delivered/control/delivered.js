import Block from "../../../global/classes/class-Block";
import { componentTemplate } from "../view/delivered.tmp";
export default class Delivered extends Block {
    constructor(tag, props, template = componentTemplate) {
        super(tag, props, template);
    }
    getElement(temp = this._templateDef) {
        return super._getElement(temp);
    }
}
//# sourceMappingURL=delivered.js.map