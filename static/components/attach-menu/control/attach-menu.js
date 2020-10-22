import Block from "../../../global/classes/class-Block.js";
import { attachMenu } from "../view/attach-menu.tmp.js";
export default class AttachMenu extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = attachMenu;
    }
}
//# sourceMappingURL=attach-menu.js.map