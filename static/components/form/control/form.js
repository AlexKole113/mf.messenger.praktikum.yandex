import Block from "../../../global/classes/class-Block";
import { componentTemplate } from "../view/form.tmp";
export default class Form extends Block {
    constructor(tag, props, template = componentTemplate) {
        super(tag, props, template);
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
                    let elmListnerTarg = document.querySelector(elm + ' form');
                    elmListnerTarg.addEventListener('submit', listner[evName]);
                }
                else {
                    let elmListnerTarg = document.querySelector(elm);
                    elmListnerTarg.addEventListener(evName, listner[evName]);
                }
            }
        }
    }
}
//# sourceMappingURL=form.js.map