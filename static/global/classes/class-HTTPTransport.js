export default class HTTPTransport {
    constructor() {
        this.get = (url, options = {}) => {
            options.data = this.queryStringify(options.data);
            return this.request(url, Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.GET }), options.timeout);
        };
        this.put = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.PUT }), options.timeout);
        };
        this.post = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.POST }), options.timeout);
        };
        this.delete = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.DELETE }), options.timeout);
        };
        this.request = (url, options = {}) => {
            const { method, data } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                if (method === HTTPTransport.METHODS.GET) {
                    xhr.open(method, url + options.data);
                }
                else {
                    xhr.open(method, url);
                }
                xhr.onload = function () {
                    resolve(xhr);
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (method === HTTPTransport.METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(data);
                }
            });
        };
    }
    queryStringify(data) {
        if (typeof data !== 'object')
            return;
        let getString = ``;
        for (let key in data) {
            getString += this._recursQueryStringCreator(data[key], ``, key);
        }
        return getString;
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