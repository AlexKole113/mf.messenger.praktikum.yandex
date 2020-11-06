import Route from "./class-Route.js";
import ChatApi from "../api/class-ChatApi.js";


export default class Router {

    protected _currentRoute   !:object|null;
    protected _rootQuery;
    static    __instance       :object|any;
    routes;


    constructor( rootQuery = {} ) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes             = [];
        this._currentRoute      = null;
        this._rootQuery         = rootQuery;
        Router.__instance       = this;
    }

    use( pathname:string, block:any, props:{} = {} ) {
        const route = new Route( pathname, block, { rootQuery: this._rootQuery, ...props }, Router.__instance._rootQuery);
        Router.__instance.routes.push( route );
        return Router.__instance;
    }

    start() {
        //@ts-ignore
        window.onpopstate = ( event => {
            if( event.state ){
                let state = JSON.stringify( event.state.page ).replace(/"/g,'');
                this._onRoute( state );
            }
        }).bind(this);
    }

    _onRoute( pathname:string ) {
        let route = this.getRoute( this._pathDetector(pathname) );
        if (!route) {
            pathname = '/error';
            route    = this.getRoute( '/error' )
        }


        if (!this._currentRoute) {
            this._currentRoute = this.getRoute( '/auth' );
        }

        //this._currentRoute.leave();
        route.leavePage()

        //route.render(route, pathname);
        route.renderPage()

        this._currentRoute = this.getRoute( this._pathDetector(pathname) );
    }

    go( pathname:string ) {

        this._authorizationCheck()
        .then( ( data ) => {
            if(!data && this._pathDetector(pathname) !== '/registration'){
                this._onRoute( '/auth' );
            } else{
                window.history.pushState (
                    { page: pathname },
                    `${ pathname }`,
                    pathname
                );

                this._onRoute( pathname );
            }
        })
    }

    back() {
        window.history.back()
    }

    forward() {
        window.history.forward()
    }

    getRoute(pathname:string) {
        return Router.__instance.routes.find( (route:string) => { return route.match(pathname) });
    }

    _authorizationCheck() {
        const checker = new ChatApi();
        return checker.checkAuthorization();
    }

    _pathDetector( url:string ){
        if( url.indexOf('?') !== -1 ) {
            url      = url.replace(/#/g,'')
            url      = url.split('?')[0];
            let path = url.split('/');
            let newpath = `/${path[path.length-1]}`;
            return newpath;
        } else {
           return  url;
        }

    }


}
