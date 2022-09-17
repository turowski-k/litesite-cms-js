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
    rendererModule.renderView('blog', viewModel);
}

export function pages(viewModel) {
    textModule.getPage(viewModel.hashParams.id)
        .then(p => {
            viewModel.content = p;
            return dataModule.getPage(viewModel.hashParams.id);
        }).then(h => {
            viewModel.header = h;
            rendererModule.renderView('pages', viewModel);
        });
}

export function pagesView(viewModel) {
    rendererModule.renderView('pages-view', viewModel);
}