import * as logging from './logging.js';

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
    const viewModel = { hashParams: Object.assign({}, hashParams), queryParams: Object.assign({}, queryParams) };
    route.callback(viewModel);
    logging.logRoute(route);
}

function resolveRoute(requestedRoute, queryParams) {
    for (const route of routes) {
        // TODO: This might call for rework, possibly order of if-s is wrong, maybe should check *, :, === instead?
        let match = true;
        // check against routes one by one, return first match
        // (registering route order is important, start from most specific)
        for (let i = 0; i < route.path.length; i++) {
            // check if route node calls for exact match and is matching
            if (route.path[i] === requestedRoute[i]) {
                continue;
            }
            // check if route node calls for parameter and assign it
            else if (route.path[i][0] === ':' && requestedRoute[i] !== '') {
                const nodeKey = route.path[i].slice(1);
                queryParams[nodeKey] = requestedRoute[i];
                continue;
            }
            // check if route node is a wildcard - if so,
            // then it's a match and everything beyond is ignored
            // useful for creating semantic urls like #/blog/1/my-awesome-post-name
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