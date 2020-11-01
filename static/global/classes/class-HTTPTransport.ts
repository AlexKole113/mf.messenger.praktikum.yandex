export default class HTTPTransport {

    static METHODS = {
        GET:    'GET',
        PUT:    'PUT',
        POST:   'POST',
        DELETE: 'DELETE',
    };

    get = (url, options = {}) => {
        options.data = this.queryStringify( options.data )
        return this.request(url, { ...options, method: HTTPTransport.METHODS.GET }, options.timeout );
    };
    put = (url, options = {}) => {
        return this.request(url, { ...options, method: HTTPTransport.METHODS.PUT }, options.timeout )
    };
    post = (url, options = {}) => {
        return this.request(url, { ...options, method: HTTPTransport.METHODS.POST }, options.timeout );
    };
    delete = (url, options = {}) => {
        return this.request(url, { ...options, method: HTTPTransport.METHODS.DELETE }, options.timeout );
    };

    request = (url, options = {}) => {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if( method === HTTPTransport.METHODS.GET ){
                xhr.open(method, url + options.data);
            } else {
                xhr.open(method, url);
            }


            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === HTTPTransport.METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }

    queryStringify( data:any )  {
        if( typeof data !== 'object' ) return;

        let getString = ``;
        for ( let key in data ){
            getString += this._recursQueryStringCreator( data[key] ,  ``, key );
        }

        return getString;
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