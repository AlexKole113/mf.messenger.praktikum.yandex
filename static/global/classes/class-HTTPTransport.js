export default class HTTPTransport {
    constructor() {
        this.url = '';
        this.get = (url, options = {}) => {
            this.url = url;
            if (Object.keys(options).length !== 0) {
                options.data = this.queryStringify(options.data);
            }
            const request = this.request(Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.GET }), options.timeout)
                .then((response) => {
                if (!response)
                    throw new Error(`Ошибка HTTPTransport`);
                return response;
            });
            return request;
        };
        this.put = (url, options = {}) => {
            this.url = url;
            const request = this.request(Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.PUT }), options.timeout)
                .then((response) => {
                if (!response)
                    throw new Error(`Ошибка HTTPTransport`);
                return response;
            });
            return request;
        };
        this.post = (url, options = {}) => {
            this.url = url;
            const request = this.request(Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.POST }), options.timeout)
                .then((response) => {
                if (!response)
                    throw new Error(`Ошибка HTTPTransport`);
                return response;
            });
            return request;
        };
        this.delete = (url, options = {}) => {
            this.url = url;
            const request = this.request(Object.assign(Object.assign({}, options), { method: HTTPTransport.METHODS.DELETE }), options.timeout)
                .then((response) => {
                if (!response)
                    throw new Error(`Ошибка HTTPTransport`);
                return response;
            });
            return request;
        };
        this.request = (options = {}, timeout) => {
            const { method, data = '', headers } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                if (method === HTTPTransport.METHODS.GET) {
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