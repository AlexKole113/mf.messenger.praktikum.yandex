export default class Route implements Route  {

    _pathname       :string
    _blockClass     :Block
    _block          :RouteType|null
    _props          :props
    _parentElement  :string



    constructor(pathname:string, view:Block, props:props, parentElement:string ) {
        this._pathname                  = pathname;
        this._blockClass                = view;
        this._block                     = null;
        this._props                     = props;
        this._parentElement             = parentElement
    }

    match( pathname:string ) {
        return ( pathname === this._pathname )
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    render() {
        if(!this._block){
            this._blockClass.render();
            return
        }

        this._block.show();
    }

    leavePage() {
       document.body.innerHTML = '<div class="mobile-wrapper"></div>';
    }


    renderPage(){
        this._blockClass.render();
    }

}
