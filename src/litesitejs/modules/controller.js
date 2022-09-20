import * as rendererModule from './renderer.js';
import * as textModule from './text.js';
import * as dataModule from './data.js';
import * as configModule from './config.js';

const contentNode = document.getElementById('content-node');

export async function home(viewModel) {
    viewModel.config = await getConfig(viewModel);
    rendererModule.renderView('home', viewModel);
}

export async function blogView(viewModel) {
    viewModel.config = await getConfig(viewModel);
    viewModel.content = await textModule.getPost(viewModel.hashParams.id);
    viewModel.header = await dataModule.getPost(viewModel.hashParams.id);
    rendererModule.renderView('blog-view', viewModel);
}

export async function blog(viewModel) {
    viewModel.config = await getConfig(viewModel);
    viewModel.posts = await dataModule.getPosts(viewModel.queryParams);
    rendererModule.renderView('blog', viewModel);
}

export async function pages(viewModel) {
    viewModel.config = await getConfig(viewModel);
    viewModel.pages = await dataModule.getPages(viewModel.queryParams);
    rendererModule.renderView('pages', viewModel);
}

export async function pagesView(viewModel) {
    viewModel.config = await getConfig(viewModel);
    viewModel.content = await textModule.getPage(viewModel.hashParams.id);
    viewModel.header = await dataModule.getPage(viewModel.hashParams.id);
    rendererModule.renderView('pages-view', viewModel);
}

async function getConfig(viewModel) {
    const cfg = await configModule.getConfig();
    return cfg;
}