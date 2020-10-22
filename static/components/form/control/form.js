import Block from "../../../global/classes/class-Block.js";
import { formTemplate } from "../view/form.tmp.js";
export default class Form extends Block {
    constructor(tag, props) {
        super(tag, props);
        this._templateDef = formTemplate;
    }
    _attachHandler(elm) {
        if (!elm) {
            elm = this._meta.tagName;
        }
        for (let listner of this.props.handlers) {
            for (let evName in listner) {
                if (typeof listner[evName] !== "function")
                    continue;
                if (evName === 'focus' || evName === 'blur') {
                    document.querySelectorAll(elm + ' input').forEach((elm) => {
                        elm.addEventListener(evName, listner[evName]);
                    });
                }
                else if (evName === 'submit') {
                    document.querySelector(elm + ' form').addEventListener('submit', listner[evName]);
                }
                else {
                    document.querySelector(elm).addEventListener(evName, listner[evName]);
                }
            }
        }
    }
}
//# sourceMappingURL=form.js.map