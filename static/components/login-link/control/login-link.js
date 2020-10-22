import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import { loginLink } from "../view/login-link.tmp.js";
export default class LoginLink extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = loginLink;
    }
    getElement(temp) {
        return this._getElement(temp);
    }
    _getElement(temp = this._templateDef) {
        let templator = new Templator(temp);
        return templator.compile(this.props);
    }
}
//# sourceMappingURL=login-link.js.map