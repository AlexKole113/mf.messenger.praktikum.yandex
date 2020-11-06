import Templator from "../../../global/classes/class-Templator.js";
import Block from "../../../global/classes/class-Block.js";
import { componentTemplate } from "../view/chat-list.tmp.js";
export default class ChatList extends Block {
    constructor(tag, props, activeClass, template = componentTemplate) {
        super(tag, props, template);
        this._element = null;
        this.activeClass = activeClass;
    }
    _getElement(temp = this._templateDef) {
        let templator = new Templator(temp);
        let userList = '';
        for (let i = 0; i < this.props.length; i++) {
            userList += templator.compile(this.props[i]);
        }
        this.rootElm.innerHTML = userList;
        return this.rootElm.outerHTML;
    }
    setProps(nextProps) {
        // if (!nextProps) return;
        this.props = nextProps;
        for (let i = 0; i < this.props.length; i++) {
            (this.props[i].active === true) ? this.props[i].active = this.activeClass : this.props[i].active = '';
            //( this.props[i].msg_amount < 1 )  ?  this.props[i].msg_amount = '' : this.props[i].msg_amount;
        }
        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    }
    render(elm) {
        if (!elm) {
            elm = this._meta.tagName;
        }
        let templator = new Templator(this._templateDef);
        let userList = '';
        for (let i = 0; i < this.props.length; i++) {
            userList += templator.compile(this.props[i]);
        }
        let elementRenderTarget = document.querySelector(elm);
        elementRenderTarget.innerHTML = userList;
    }
    getElement(temp) {
        return this._getElement(temp);
    }
}
//# sourceMappingURL=chat-list.js.map