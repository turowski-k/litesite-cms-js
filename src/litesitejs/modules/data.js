import * as logging from './logging.js';

const posts = [];
const pages = [];
let initialized = false;

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

export function getPosts(queryParams) {
    return ensureInitialized().then(x => posts);
}

export function getPages(queryParams) {
    return ensureInitialized().then(x => pages);
}

export function getPost(id) {
    return ensureInitialized().then(x => posts.find(x => x.id === id));
}

export function getPage(id) {
    return ensureInitialized().then(x => pages.find(x => x.id === id));
}

function ensureInitialized() {
    return new Promise(function (resolve) {
        function checkInitialized() {
            if (initialized) return resolve();
            setTimeout(checkInitialized, 50);
        }
        checkInitialized();
    });
}

async function init() {
    await loadPages();
    await loadPosts();
    initialized = true;
    logging.logInfo(`Indexes initialized, posts: ${posts.length}, pages: ${pages.length}`);
}

async function loadPages() {
    await getJsonContent('./data/pages.json')
        .then(p => pages.push(...p.pages));
}

async function loadPosts() {
    await getJsonContent('./data/posts.json')
        .then(p => posts.push(...p.posts));
}

init();