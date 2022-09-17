import * as layoutModule from './layout.js';

export async function renderView(viewName, viewModel) {
    const view = await layoutModule.getView(viewName, viewModel);
    console.log(view);
    document.body.innerHTML = view;
}