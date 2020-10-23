import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import Delivered from "../../delivered/control/delivered.js";
import { componentTemplate } from "../view/message.tmp.js";
export default class Message extends Block {
    constructor(tag, props, selfClass, template = componentTemplate) {
        super(tag, props, template);
        this.setProps = nextProps => {
            if (!nextProps)
                return;
            this.props = nextProps;
            for (let i = 0; i < this.props.length; i++) {
                (this.props[i].user === 1) ? this.props[i].user = 'self' : this.props[i].user = 'other';
                if (this.props[i].delivered === true) {
                    this.props[i].delivered = new Delivered('div', {}).getElement();
                }
                else {
                    this.props[i].delivered = '';
                }
            }
            this.eventBus.emit(Block.EVENTS.FLOW_CDU);
            return this;
        };
        this.actualize(props);
    }
    _getElement(temp = this._templateDef) {
        let templator = new Templator(temp);
        let messageList = '';
        for (let i = 0; i < this.props.length; i++) {
            messageList += templator.compile(this.props[i]);
        }
        this.rootElm.innerHTML = messageList;
        return this.rootElm.outerHTML;
    }
    render(elm) {
        if (!elm) {
            elm = this._meta.tagName;
        }
        let templator = new Templator(this._templateDef);
        let messageList = '';
        for (let i = 0; i < this.props.length; i++) {
            messageList += templator.compile(this.props[i]);
        }
        document.querySelector(elm).innerHTML = messageList;
    }
    getElement(temp) {
        return this._getElement(temp);
    }
    actualize(props) {
        if (!props)
            return;
        this.props = props;
        for (let i = 0; i < this.props.length; i++) {
            (this.props[i].user === 1) ? this.props[i].user = 'self' : this.props[i].user = 'other';
            if (this.props[i].delivered === true) {
                this.props[i].delivered = new Delivered('div', {}).getElement();
            }
            else {
                this.props[i].delivered = '';
            }
        }
        return this;
    }
}
//# sourceMappingURL=message.js.map