export default class Route {
    constructor(pathname, view, props, parentElement) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this._parentElement = parentElement;
    }
    match(pathname) {
        return (pathname === this._pathname);
    }
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }
    render() {
        if (!this._block) {
            this._blockClass.render();
            return;
        }
        this._block.show();
    }
    leavePage() {
        document.body.innerHTML = '<div class="mobile-wrapper"></div>';
    }
    renderPage() {
        this._blockClass.render();
    }
}
//# sourceMappingURL=class-Route.js.map