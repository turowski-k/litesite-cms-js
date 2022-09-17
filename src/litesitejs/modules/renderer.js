import * as text from './text.js';

export async function renderView(viewName) {
    const content = await text.getFileContent('./data/sample.md');
    return content;
}