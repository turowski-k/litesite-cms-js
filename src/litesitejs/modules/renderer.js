import * as layoutModule from './layout.js';

export async function renderView(viewName, viewModel) {
    const view = await layoutModule.getView(viewName, viewModel);
    document.body.innerHTML = view;
}