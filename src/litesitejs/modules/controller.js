import * as renderer from './renderer.js';

const contentNode = document.getElementById('content-node');

export function home(hashParams, queryParams) {
    const view = renderer.renderView('home', hashParams, queryParams);
    pushView(view);
}

export function blogView(hashParams, queryParams) {
    const view = renderer.renderView('blog-view', hashParams, queryParams);
    pushView(view);
}

export function blog(hashParams, queryParams) {
    const view = renderer.renderView('blog', hashParams, queryParams);
    pushView(view);
}

export function pages(hashParams, queryParams) {
    const view = renderer.renderView('pages', hashParams, queryParams);
    pushView(view);
}

export function pagesView(hashParams, queryParams) {
    const view = renderer.renderView('pages-view', hashParams, queryParams);
    pushView(view);
}

function pushView(view) {
    contentNode.innerHTML = view;
}