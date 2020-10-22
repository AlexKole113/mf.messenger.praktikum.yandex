import EventBus from "./class-EventBus.js";
import Templator from "./class-Templator.js";
export default class Block {
    constructor(tagName = "div", props = {}) {
        this._element = null;
        this._meta = null;
        this._templateDef = null;
        this.handlers = null;
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        let rootElement = this._meta.tagName;
        let root = rootElement;
        let rootId = '';
        let rootClasses = '';
        //пока так(
        if (rootElement.indexOf('#') != -1) {
            root = rootElement.split('#')[0];
            rootId = rootElement.split('#')[1].split('.')[0];
            rootElement = rootElement.substr(rootElement.indexOf('.'));
            if (rootElement.indexOf('.') !== -1) {
                let classes = rootElement.split('.');
                for (let i = 0; i < classes.length; i++) {
                    rootClasses += `${classes[i]} `;
                }
            }
        }
        else {
            if (rootElement.indexOf('.') !== -1) {
                root = rootElement.split('.')[0];
                let classes = rootElement.split('.');
                for (let i = 1; i < classes.length; i++) {
                    rootClasses += `${classes[i]} `;
                }
            }
        }
        this.rootElm = document.createElement(root);
        this.rootElm.setAttribute('id', rootId);
        this.rootElm.setAttribute('class', rootClasses);
    }
    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    _componentDidUpdate() {
        if (document.querySelector(this._meta.tagName)) {
            this.render();
        }
        this._attachHandler();
    }
    setProps(nextProps) {
        if (!nextProps)
            return;
        this.props = nextProps;
        Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return this;
    }
    ;
    get element() {
        return this._element;
    }
    render(elm, temp) {
        if (document.querySelector(this._meta.tagName)) {
            let html = this._render(temp);
            document.querySelector(this._meta.tagName).innerHTML = html;
            if (this.props.handlers) {
                this._attachHandler(elm);
            }
        }
        else {
            let html = this._render(temp);
            this.rootElm.innerHTML = html;
            document.querySelector(elm).append(this.rootElm);
            if (this.props.handlers) {
                this._attachHandler(elm);
            }
        }
    }
    _render(temp = this._templateDef) {
        let templator = new Templator(temp);
        return templator.compile(this.props);
    }
    _attachHandler(elm) {
        if (!elm) {
            elm = this._meta.tagName;
        }
        if (Array.isArray(this.props.handlers)) {
            for (let listner of this.props.handlers) {
                for (let evName in listner) {
                    if (typeof listner[evName] !== "function")
                        continue;
                    document.querySelector(elm).addEventListener(evName, listner[evName]);
                }
            }
        }
        else {
            for (let handler in this.props.handlers) {
                if (typeof this.props.handlers[handler] !== "function")
                    continue;
                document.querySelector(elm).addEventListener(handler, this.props.handlers[handler]);
            }
        }
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        // Еще один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;
        let proxyProps = new Proxy(self, {
            get(target, prop) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('error');
                }
                return self[prop] ? self[prop] : props[prop];
            },
            set(target, prop, val) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('error');
                }
                target[prop] = val;
                return target[prop];
            },
            deleteProperty(target, prop) {
                throw new Error('error');
            },
        });
        return proxyProps;
    }
    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    getElement(temp) {
        return this._getElement(temp);
    }
    _getElement(temp = this._templateDef) {
        let templator = new Templator(temp);
        let html = templator.compile(this.props);
        this.rootElm.innerHTML = html;
        return this.rootElm.outerHTML;
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "component-did-mount",
    FLOW_CDU: "component-did-update",
    FLOW_RENDER: "render"
};
//# sourceMappingURL=class-Block.js.map