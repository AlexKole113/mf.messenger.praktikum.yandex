import Block from "../../../global/classes/class-Block.js";
import { delivered } from "../view/delivered.tmp.js";
export default class Delivered extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = delivered;
    }
}
//# sourceMappingURL=delivered.js.map