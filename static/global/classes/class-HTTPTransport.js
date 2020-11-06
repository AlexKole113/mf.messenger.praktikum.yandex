export default class HTTPTransport {
    constructor(url) {
        this.get = (options = {}) => {
            if (Object.keys(options).length !== 0) {
                options.data = this.queryStringify(options.data);
            }
            return this.request(Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.GET }), options.timeout);
        };
        this.put = (options = {}) => {
            return this.request(Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.PUT }), options.timeout);
        };
        this.post = (options = {}) => {
            return this.request(Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.POST }), options.timeout);
        };
        this.delete = (options = {}) => {
            return this.request(Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.DELETE }), options.timeout);
        };
        this.request = (options = {}, timeout) => {
            let { method, data, headers } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                if (method === HTTPTransport.METHODS.GET) {
                    data = data || '';
                    xhr.open(method, this.url + data);
                }
                else {
                    xhr.open(method, this.url);
                }
                if (!headers) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                }
                if (timeout) {
                    xhr.timeout = timeout;
                }
                xhr.onload = function () {
                    resolve(xhr);
                };
                xhr.onerror = resolve;
                xhr.ontimeout = resolve;
                xhr.onabort = reject;
                if (method === HTTPTransport.METHODS.GET || !data) {
                    xhr.send(null);
                }
                else {
                    xhr.send(data);
                }
            });
        };
        this.url = url;
    }
    queryStringify(data) {
        if (typeof data !== 'object')
            return;
        let getString = ``;
        for (let key in data) {
            getString += this._recursQueryStringCreator(data[key], ``, key);
        }
        if (getString[getString.length - 1] === '&') {
            getString = getString.substring(0, getString.length - 1);
        }
        return `?${getString}`;
    }
    _recursQueryStringCreator(data, string, key = ``) {
        let keyGlob = key;
        if (typeof data === 'object') {
            for (let j in data) {
                string = this._recursQueryStringCreator(data[j], string, key += `[${j}]`);
                key = keyGlob;
            }
        }
        else {
            string += `${key}=${data}&`;
        }
        return string;
    }
}
HTTPTransport.METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};
//# sourceMappingURL=class-HTTPTransport.js.map