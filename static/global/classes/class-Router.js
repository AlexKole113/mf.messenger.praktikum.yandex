import Route from "./class-Route.js";
import ChatApi from "../api/class-ChatApi.js";
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
        const route = new Route(pathname, block, Object.assign({ rootQuery: this._rootQuery }, props), Router.__instance._rootQuery);
        Router.__instance.routes.push(route);
        return Router.__instance;
    }
    start() {
        //@ts-ignore
        window.onpopstate = (event => {
            if (event.state) {
                let state = JSON.stringify(event.state.page).replace(/"/g, '');
                this._onRoute(state);
            }
        }).bind(this);
    }
    _onRoute(pathname) {
        let route = this.getRoute(this._pathDetector(pathname));
        if (!route) {
            pathname = '/error';
            route = this.getRoute('/error');
        }
        if (!this._currentRoute) {
            this._currentRoute = this.getRoute('/auth');
        }
        //this._currentRoute.leave();
        route.leavePage();
        //route.render(route, pathname);
        route.renderPage();
        this._currentRoute = this.getRoute(this._pathDetector(pathname));
    }
    go(pathname) {
        this._authorizationCheck()
            .then((data) => {
            if (!data && this._pathDetector(pathname) !== '/registration') {
                this._onRoute('/auth');
            }
            else {
                window.history.pushState({ page: pathname }, `${pathname}`, pathname);
                this._onRoute(pathname);
            }
        });
    }
    back() {
        window.history.back();
    }
    forward() {
        window.history.forward();
    }
    getRoute(pathname) {
        return Router.__instance.routes.find((route) => { return route.match(pathname); });
    }
    _authorizationCheck() {
        const checker = new ChatApi();
        return checker.checkAuthorization();
    }
    _pathDetector(url) {
        if (url.indexOf('?') !== -1) {
            url = url.replace(/#/g, '');
            url = url.split('?')[0];
            const path = url.split('/');
            const newpath = `/${path[path.length - 1]}`;
            return newpath;
        }
        else {
            return url;
        }
    }
}
//# sourceMappingURL=class-Router.js.map