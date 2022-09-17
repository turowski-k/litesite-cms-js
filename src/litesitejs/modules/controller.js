import * as renderer from './renderer.js';

const contentNode = document.getElementById('content-node');

export function home(hashParams, queryParams) {
    renderer.renderView('home', hashParams, queryParams)
        .then(v => pushView(v));
}

export function blogView(hashParams, queryParams) {
    renderer.renderView('blog-view', hashParams, queryParams)
        .then(v => pushView(v));
}

export function blog(hashParams, queryParams) {
    renderer.renderView('blog', hashParams, queryParams)
        .then(v => pushView(v));
}

export function pages(hashParams, queryParams) {
    renderer.renderView('pages', hashParams, queryParams)
        .then(v => pushView(v));
}

export function pagesView(hashParams, queryParams) {
    renderer.renderView('pages-view', hashParams, queryParams)
        .then(v => pushView(v));
}

function pushView(view) {
    contentNode.innerHTML = view;
}