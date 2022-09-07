﻿const http = {
    _apps: {},
    HttpRoute: class {
        constructor(route, method, callback) {
            this.route = route
            this.method = method
            this.callback = callback
        }
    },
    HttpApplication: class {
        constructor(name, host, port, enableHttps = true) {
            this.name = name;
            this.host = host;
            this.port = port;
            this.enableHttps = enableHttps;
            this.echoes = [];
            this.routes = [];

            this.middlewares = [];

            this._mountExecutionTree = (callback, localMiddlewares) => {
                const executionTree = new Promise(() => {
                    const middlewareIndex = 0;
                    const middlewareLenght = this.middlewares.length;
                    let callback;
                    while (middlewareIndex < middlewareLenght) {
                        if (this.middlewares[middlewareIndex] instanceof Promise) {

                        }
                    }
                });

                return executionTree;
            }
        }
        use(middleware) {
            this.middlewares.push(middleware);
        }
        route(route, method, callback, localMiddlewares = []) {
            const fixedMethod = method.toUpperCase();
            switch (fixedMethod) {
                case "GET":
                    this.get(route, callback, localMiddlewares);
                    break;

                case "POST":
                    this.post(route, callback, localMiddlewares);
                    break;

                case "DELETE":
                    this.delete(route, callback, localMiddlewares);
                    break;
            }
        }
        get(route, callback, localMiddlewares = []) {
            const httpRoute = new http.HttpRoute(route, "GET", this._mountExecutionTree(callback, localMiddlewares));
            this.routes.push(httpRoute);
        }
        post(route, callback, middlewares = []) {
            const httpRoute = new http.HttpRoute(route, "POST", this._mountExecutionTree(callback, localMiddlewares));
            this.routes.push(httpRoute);
        }
        delete(route, callback, middlewares = []) {
            const httpRoute = new http.HttpRoute(route, "DELETE", this._mountExecutionTree(callback, localMiddlewares));
            this.routes.push(httpRoute);
        }
        run() {
            const parameters = JSON.stringify({
                Name: this.name,
                Host: this.host,
                Port: this.port,
                Routes: JSON.stringify(this.routes),
                Echoes: JSON.stringify(this.echoes),
                EnableHttps: this.enableHttps
            });

            _$internalBinding["SetupWebApplication"](parameters);
        }
        listen(port, host = this.host) {
            this.echoes.push({
                host,
                port: Number(port)
            })
        }
    },
    Response: class {
        constructor(body, headers, latency, statusCode, ok) {
            this.body = body;
            this.headers = headers;
            this.latency = latency;
            this.statusCode = statusCode;
            this.ok = ok;
        }

        json() {
            return std.json.tryParse(this.body, x => x);
        }

        text() {
            return this.body;
        }
    },
    app: (options = { name: "webapp", host: "localhost", port: 80, enableHttps: false }) => {
        const { HttpApplication } = http;
        const name = options.name;
        const host = options.host;
        const port = options.port;
        const enableHttps = options.enableHttps ?? false;

        http._apps[name] = (new HttpApplication(name, host, port, enableHttps));
        return http._apps[name];
    },
    request: function (target, method = "GET", body = "{}", headers = "{}") {
        return new AsyncTask((target, method, body, headers) => {
            typeof headers === "object" ? headers = JSON.stringify(headers) : {};
            typeof body === "object" ? body = JSON.stringify(body) : {};

            const rawResult = _$internalBinding["FetchRequest"](target, method, body, headers);

            return new http.Response(
                rawResult.Body ?? "",
                rawResult.Headers ?? {},
                rawResult.Latency ?? 0,
                rawResult.StatusCode ?? 599,
                rawResult.Ok ?? false
            )
        }, [target, method, body, headers]).execute();
    },
    result: (statusCode, response = {}) => {
        return {
            type: "application/json",
            status: statusCode,
            response: JSON.stringify(response)
        }
    },
    static: (response, type) => {
        return {
            type,
            status: 200,
            response
        }
    },
    image: (response, extension) => {
        extension = extension === "jpg" ? "jpeg" : extension;
        return http.static(response, `image/${extension}`);
    },
    audio: (response, extension) => http.static(response, `audio/${extension}`),
    video: (response, extension) => http.static(response, `video/${extension}`),
    pdf: (response) => http.static(response, 'application/pdf'),
    html: (response) => http.static(response, 'text/html')
}