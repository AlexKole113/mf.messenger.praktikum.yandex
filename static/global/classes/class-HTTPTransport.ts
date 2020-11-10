export default class HTTPTransport implements Sender {

    static METHODS = {
        GET:    'GET',
        PUT:    'PUT',
        POST:   'POST',
        DELETE: 'DELETE',
    };

    url = '';

    get = (url:string, options:{[key:string]:any} = {} ) => {
        this.url = url;
        if ( Object.keys(options).length !== 0 ) {
            options.data = this.queryStringify( options.data )
        }

        const request = this.request( { ...options, method: HTTPTransport.METHODS.GET }, options.timeout )
        .then( ( response:ApiResponse ) => {
            if( !response ) throw new Error( `Ошибка HTTPTransport` )
            return response;
        });

        return request;
    };

    put = (url:string, options:{[key:string]:any} = {} ) => {
        this.url = url;
        const request = this.request( { ...options, method: HTTPTransport.METHODS.PUT }, options.timeout )
        .then( ( response:ApiResponse ) => {
            if( !response ) throw new Error( `Ошибка HTTPTransport` )
            return response;
        });
        return request;
    };

    post = (url:string, options:{[key:string]:any} = {} ) => {
        this.url = url;
        const request = this.request({ ...options, method: HTTPTransport.METHODS.POST }, options.timeout )
        .then( ( response:ApiResponse ) => {
            if( !response ) throw new Error( `Ошибка HTTPTransport` )
            return response;
        });
        return request;
    };

    delete = (url:string, options:{[key:string]:any} = {} ) => {
        this.url = url;
        const request = this.request({ ...options, method: HTTPTransport.METHODS.DELETE }, options.timeout )
        .then( ( response:ApiResponse ) => {
            if( !response ) throw new Error( `Ошибка HTTPTransport` )
            return response;
        });
        return request;
    };


    request = ( options:{[key:string]:any} = {}, timeout:number) => {

        const {method, data = '', headers } = options;


        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            if( method === HTTPTransport.METHODS.GET ){
                xhr.open(method, this.url + data );
            } else {
                xhr.open( method, this.url );
            }

            if( !headers ){
                xhr.setRequestHeader( "Content-Type","application/json" );
            }

            if( timeout ){
                xhr.timeout = timeout;
            }

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onerror = resolve;
            xhr.ontimeout = resolve;
            xhr.onabort = reject;

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