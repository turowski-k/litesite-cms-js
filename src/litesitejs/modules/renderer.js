import * as text from './text.js';

export async function renderView(viewName) {
    const text = await text.getFileContent('./data/sample.md');
    return text;
}