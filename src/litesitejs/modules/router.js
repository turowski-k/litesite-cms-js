const routes = [];

function init() {
    window.addEventListener('load', onChangeRoute);
    window.addEventListener('hashchange', onChangeRoute);
}

export function registerRoute(route, callback) {
    const routeParts = route.split('/');
    routes.push({ name: route, path: routeParts, callback: callback });
}

function onChangeRoute(event) {
    let hashNodes = [], hashParams = [], queryParams = [];
    extractParameters(window.location.href, hashNodes, queryParams);
    const route = resolveRoute(hashNodes, hashParams);
    route.callback(hashParams, queryParams);
}

function resolveRoute(requestedRoute, queryParams) {
    for (const route of routes) {
        let match = true;
        for (let i = 0; i < route.path.length; i++) {
            // check for exact
            if (route.path[i] === requestedRoute[i]) {
                continue;
            }
            // check for param
            else if (route.path[i][0] === ':') {
                const nodeKey = route.path[i].slice(1);
                queryParams[nodeKey] = requestedRoute[i];
                continue;
            }
            // check for star (wildcard, ignore this and all beyond)
            else if (route.path[i] === '*') {
                break;
            }
            match = false;
            break;
        }
        if (match) {
            return route;
        }
    }
    // return default route
    // TODO: this should probably be refactored to somehow allow setting a fallback route by the app.js
    return routes.find(r => r.name == '');
}

function extractParameters(url, hashNodes, queryParams) {
    if (url.includes('#')) {
        let hash = url.slice(url.indexOf('#') + 2);
        if (hash.includes('?')) {
            hash = hash.slice(0, hash.indexOf('?'));
        }
        hash.split('/').forEach(x => hashNodes.push(x));
    }
    if (url.includes('?')) {
        let query = url.slice(url.indexOf('?') + 1).split('&');
        query.forEach(x => {
            const [key, val] = x.split('=');
            queryParams[key] = val;
        })
    }
}

init();