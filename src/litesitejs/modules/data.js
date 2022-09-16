import * as logging from './logging.js';

export async function getTextContent(filename) {
    return await fetch(filename)
        .then(f => f.text())
        .catch(e => logging.logError(e));
}

export async function getJsonContent(filename) {
    return await fetch(filename)
        .then(f => f.json())
        .catch(e => logging.logError(e));
}