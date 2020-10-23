export default class Templator {
    TEMPLATE_REGEXP_1 = /\{\{(.*?)\}\}/gi;
    TEMPLATE_REGEXP_2 = /\{\{\{(.*?)\}\}\}/gi;

    constructor( template:string ) {
        this._template = template;
    }

    protected _compileTemplate( ctx:string ) :string {
        let tmpl = this._template;
        let key = null;
        const regExp1 = this.TEMPLATE_REGEXP_1;
        const regExp2 = this.TEMPLATE_REGEXP_2;


        while ((key = regExp2.exec(tmpl)) ) {

            if (key[1]) {
                const tmplValue = key[1].trim();

                let data = this.getData(ctx, tmplValue);

                if (typeof data === "function") {
                    window[tmplValue] = data;
                    tmpl = tmpl.replace(
                        new RegExp(key[0], "gi"),
                        `window.${key[1].trim()}()`
                    );
                    continue;
                }

                tmpl = tmpl.replace(new RegExp(key[0], "gi"), data ? data : '' );
            }
        }


        while ((key = regExp1.exec(tmpl)) ) {

            if (key[1]) {
                const tmplValue = key[1].trim();

                let data = this.getData(ctx, tmplValue);

                if( typeof data === 'string' ){
                    data = data.replace( /&/g, '&amp;');
                    data = data.replace( /</g, '&lt;' );
                    data = data.replace( />/g, '&gt;' );
                    data = data.replace( /"/g, '&quot;' );
                    data = data.replace( /'/g, '&#x27;' );
                    data = data.replace( /`/g, '&#x60;' );
                }

                tmpl = tmpl.replace(new RegExp(key[0], "gi"), data );
            }
        }

        return tmpl;
    }

    public compile( ctx:string ) :string {
        return this._compileTemplate( ctx );
    }

    public getData( obj:object, path:any, defaultValue:any ) :any {
        const keys = path.split('.');

        let result = obj;
        for (let key of keys) {
            result = result[key];

            if (result === undefined) {
                return defaultValue;
            }
        }

        return result ?? defaultValue;
    }

}
