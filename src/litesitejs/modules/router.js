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
    const [path, query] = window.location.hash.slice(1).split('?');
    const pathNodes = path.split('/');
    const pathParams = [];
    const queryParams = !query ? [] : query.split('&')
        .reduce((arr, o) => {
            const oParts = o.split('=');
            arr[oParts[0]] = [oParts[1]];
            return arr;
        });
    const route = resolveRoute(pathNodes, pathParams);
    console.log(queryParams);
    //route(pathNodes, queryParams);
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
        }
        if (match) {
            return route;
        }
    }
    if (!callback) {
        // serve default route
    }
    return callback;
}

init();