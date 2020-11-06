export default class HTTPTransport {

    static METHODS = {
        GET:    'GET',
        PUT:    'PUT',
        POST:   'POST',
        DELETE: 'DELETE',
    };

    url:string

    constructor( url:string ) {
        this.url = url;
    }


    get = ( options:{[key:string]:any} = {} ) => {

        if ( Object.keys(options).length !== 0 ) {
            options.data = this.queryStringify( options.data )
        }

        return this.request( { ...options, method: HTTPTransport.METHODS.GET }, options.timeout );
    };

    put = ( options:{[key:string]:any} = {} ) => {
        return this.request( { ...options, method: HTTPTransport.METHODS.PUT }, options.timeout )
    };

    post = ( options:{[key:string]:any} = {} ) => {
        return this.request({ ...options, method: HTTPTransport.METHODS.POST }, options.timeout );
    };

    delete = ( options:{[key:string]:any} = {} ) => {
        return this.request({ ...options, method: HTTPTransport.METHODS.DELETE }, options.timeout );
    };


    request = ( options:{[key:string]:any} = {}, timeout:number) => {

        let {method, data, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            if( method === HTTPTransport.METHODS.GET ){
                data = data || '';
                xhr.open(method, this.url + data );
            } else {
                xhr.open( method, this.url );
            }

            if( !headers ){
                xhr.setRequestHeader( "Content-Type","application/json" );
            }

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = resolve;
            xhr.onerror = resolve;
            xhr.ontimeout = resolve;

            if (method === HTTPTransport.METHODS.GET || !data) {
                xhr.send(null );
            } else {
                xhr.send( data );
            }
        });
    }

    queryStringify( data:any )  {
        if( typeof data !== 'object' ) return;

        let getString = ``;
        for ( let key in data ){
            getString += this._recursQueryStringCreator( data[key] ,  ``, key );
        }

        if( getString[getString.length-1] === '&' ){
            getString = getString.substring(0, getString.length-1 );
        }

        return `?${getString}`;
    }

    _recursQueryStringCreator( data:any, string:string , key = ``) {
        let keyGlob = key;
        if ( typeof data === 'object' ) {
            for( let j in data ) {
                string = this._recursQueryStringCreator( data[j], string, key += `[${j}]` )
                key = keyGlob;
            }
        } else {
            string += `${key}=${data}&`;
        }

        return string;
    }

}