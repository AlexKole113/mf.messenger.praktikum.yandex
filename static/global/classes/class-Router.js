import Route from "./class-Route.js";
export default class Router {
    constructor(rootQuery = {}) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    use(pathname, block, props = {}) {
        const route = new Route(pathname, block, Object.assign({ rootQuery: this._rootQuery }, props), this._rootQuery);
        this.routes.push(route);
        return Router.__instance;
    }
    start() {
        window.onpopstate = (event => {
            if (event.state) {
                let state = JSON.stringify(event.state.page).replace(/"/g, '');
                this._onRoute(state);
            }
        }).bind(this);
    }
    _onRoute(pathname) {
        let route = this.getRoute(pathname);
        if (!route) {
            route = this.getRoute('/error');
        }
        if (!this._currentRoute) {
            this._currentRoute = this.getRoute('/auth');
        }
        //this._currentRoute.leave();
        route.leavePage();
        //route.render(route, pathname);
        route.renderPage();
        this._currentRoute = this.getRoute(pathname);
    }
    go(pathname) {
        window.history.pushState({ page: pathname }, `${pathname}`, pathname);
        this._onRoute(pathname);
    }
    back() {
        window.history.back();
    }
    forward() {
        window.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
//# sourceMappingURL=class-Router.js.map