export function logError(message) {
    console.log('🔴', message);
}

export function logInfo(message) {
    console.log('🔵', message);
}

export function logWarning(message) {
    console.log('🟡', message);
}

export function logRoute(route) {
    console.log(route)
    console.log('🔀', `Resolving route /${route.name}`);
}