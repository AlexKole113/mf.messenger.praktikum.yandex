import Block from "../../../global/classes/class-Block.js";
import {componentTemplate} from "../view/form.tmp.js";

export default class Form <T extends object> extends Block <T> {

    protected _meta  !:{tagName:string,props:any};
    public    props  !:props


    constructor(tag: string, props:props, template:template = componentTemplate) {
        super(tag, props, template );
    }


   protected _attachHandler(elm: string) {
        if (!elm) {
            elm = this._meta.tagName;
        }

        for (let listner of this.props.handlers) {
            for (let evName in listner) {
                if (typeof listner[evName] !== "function") continue;
                if (evName === 'focus' || evName === 'blur') {
                    document.querySelectorAll(elm + ' input').forEach((elm) => {
                        elm.addEventListener(evName, listner[evName])
                    })
                } else if (evName === 'submit') {
                    let elmListnerTarg = <HTMLElement> document.querySelector(elm + ' form');
                    elmListnerTarg.addEventListener('submit', listner[evName])
                } else {
                    let elmListnerTarg = <HTMLElement> document.querySelector(elm);
                    elmListnerTarg.addEventListener(evName, listner[evName])
                }

            }
        }
    }

}
