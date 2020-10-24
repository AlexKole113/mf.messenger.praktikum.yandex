import EventBus from "./class-EventBus.js";
import Templator from "./class-Templator.js";
// Спасибо большое за детальный фидбэк! За ссылки на инфу отдельное большое спасибо!
// Я успел исправить не все, но все что было помечено как "надо исправить" вроде исправил.
// Конечно же в ходе дальнейшей работы я буду возвращаться к твоим комментам чтобы внести изменения.
// PS typescript есть в зависимостях, но я его не стал ставить из-за ограничений по размеру проекта
export default class Block {
    constructor(tagName = "div", props, templateDef = '') {
        this.eventBus = new EventBus();
        this.props = this._makePropsProxy(props);
        this._templateDef = templateDef;
        this._meta = {
            tagName,
            props
        };
        this._registerEvents();
        this.eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents() {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
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
    _componentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    _componentDidUpdate() {
        if (document.querySelector(this._meta.tagName)) {
            this.render();
        }
        this._attachHandler();
    }
    _render(temp = this._templateDef) {
        let templator = new Templator(temp);
        return templator.compile(this.props);
    }
    _attachHandler(elm = this._meta.tagName) {
        if (Array.isArray(this.props.handlers)) {
            for (let listner of this.props.handlers) {
                for (let evName in listner) {
                    if (typeof listner[evName] !== "function")
                        continue;
                    let elementHandlerTrget = document.querySelector(elm);
                    elementHandlerTrget.addEventListener(evName, listner[evName]);
                }
            }
        }
        else {
            for (let handler in this.props.handlers) {
                if (typeof this.props.handlers[handler] !== "function")
                    continue;
                let elementHandlerTrget = document.querySelector(elm);
                elementHandlerTrget.addEventListener(handler, this.props.handlers[handler]);
            }
        }
    }
    _makePropsProxy(props) {
        // Еще один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;
        let proxyProps = new Proxy(self, {
            get(target, prop) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('error');
                }
                return target[prop] ? target[prop] : props[prop];
            },
            set(target, prop, val) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('error');
                }
                target[prop] = val;
                return target[prop];
            },
            deleteProperty() {
                throw new Error('error');
            },
        });
        return proxyProps;
    }
    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    _getElement(temp) {
        let templator = new Templator(temp);
        let html = templator.compile(this.props);
        this.rootElm.innerHTML = html;
        return this.rootElm.outerHTML;
    }
    init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
    setProps(nextProps = {}) {
        this.props = nextProps;
        Object.assign(this.props, nextProps);
        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return this;
    }
    ;
    get element() {
        return this._element;
    }
    render(elm, temp) {
        if (!elm)
            return;
        if (document.querySelector(this._meta.tagName)) {
            let html = this._render(temp);
            let elementRenderTarg = document.querySelector(this._meta.tagName);
            elementRenderTarg.innerHTML = html;
            if (this.props.handlers) {
                this._attachHandler(elm);
            }
        }
        else {
            let html = this._render(temp);
            this.rootElm.innerHTML = html;
            let HtmlElement = document.querySelector(elm);
            HtmlElement.append(this.rootElm);
            if (this.props.handlers) {
                this._attachHandler(elm);
            }
        }
    }
    getContent() {
        return this.element;
    }
    getElement(temp = this._templateDef) {
        return this._getElement(temp);
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "component-did-mount",
    FLOW_CDU: "component-did-update",
    FLOW_RENDER: "render"
};
//# sourceMappingURL=class-Block.js.map