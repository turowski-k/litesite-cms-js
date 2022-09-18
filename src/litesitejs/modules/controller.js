import * as rendererModule from './renderer.js';
import * as textModule from './text.js';
import * as dataModule from './data.js';

const contentNode = document.getElementById('content-node');

export function home(viewModel) {
    rendererModule.renderView('home', viewModel);
}

export function blogView(viewModel) {
    textModule.getPost(viewModel.hashParams.id)
        .then(p => {
            viewModel.content = p;
            return dataModule.getPost(viewModel.hashParams.id);
        }).then(h => {
            viewModel.header = h;
            rendererModule.renderView('blog-view', viewModel);
        });
}

export function blog(viewModel) {
    dataModule.getPosts(viewModel.queryParams)
        .then(ps => {
            viewModel.posts = ps;
            rendererModule.renderView('blog', viewModel);
        });
}

export function pages(viewModel) {
    dataModule.getPages(viewModel.queryParams)
        .then(ps => {
            viewModel.pages = ps;
            rendererModule.renderView('pages', viewModel);
        });
}

export function pagesView(viewModel) {
    textModule.getPage(viewModel.hashParams.id)
        .then(p => {
            viewModel.content = p;
            return dataModule.getPage(viewModel.hashParams.id);
        }).then(h => {
            viewModel.header = h;
            rendererModule.renderView('pages-view', viewModel);
        });
}