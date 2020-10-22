import Block from "../../../global/classes/class-Block.js";
import { searchTemplate } from "../view/search.tmp.js";
export default class Seacrh extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = searchTemplate;
    }
}
//# sourceMappingURL=search.js.map