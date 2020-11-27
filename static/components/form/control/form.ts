import Block from "../../../global/classes/class-Block";
import {componentTemplate} from "../view/form.tmp";


type FormProps = {
    inputs: string,
    handlers:   { [key:string]: CallableFunction|any }[]
}


export default class Form extends Block <FormProps> {

    protected _meta  !:{tagName:string,props:any};
    public    props  !:FormProps


    constructor(tag: string, props:FormProps, template:template = componentTemplate) {
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
