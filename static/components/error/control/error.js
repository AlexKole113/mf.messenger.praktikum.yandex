import Block from "../../../global/classes/class-Block.js";
import { errorTemplate } from "../view/error.tmp.js";
export default class ErrorShow extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = errorTemplate;
    }
}
//# sourceMappingURL=error.js.map