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
    return ensureInitialized().then(x => {
        if (!queryParams.category && !queryParams.tag) return posts;
        let filtered = posts;
        if (queryParams.category) {
            console.log(queryParams.category)
            filtered = filtered.filter(y => y.categories.some(z => z == queryParams.category));
        }
        if (queryParams.tag) {
            filtered = filtered.filter(y => y.tags.some(z => z == queryParams.tag));
        }
        return filtered;
    });
}

export function getPages(queryParams) {
    // we can skip processing queryParams, because that's for filtering
    // and for now, we don't intend to list pages, let alone filter them
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
        .then(p => {
            let ps = p.posts.map(o => ({ ...o, date: Date.parse(`${o.date} `), dateString: o.date }));
            ps = ps.sort((a, b) => b.date - a.date);
            posts.push(...ps);
        });
}

init();