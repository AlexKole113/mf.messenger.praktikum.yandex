import Block from "../../../global/classes/class-Block.js";
import { delivered } from "../view/delivered.tmp.js";
export default class NewMessageTicket extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = delivered;
    }
}
//# sourceMappingURL=new-message-ticket.js.map