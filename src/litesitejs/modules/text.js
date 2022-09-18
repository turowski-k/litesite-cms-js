import * as logging from './logging.js';
import * as config from './config.js';
import * as parser from './parser.js';
import * as dataModule from './data.js';

export async function getPost(id) {
    const post = await dataModule.getPost(id);
    const content = await getFileContent(`./data/posts/${post.file ?? post.id + '.md'}`);
    return parser.parseMarkdown(content);
}

export async function getPage(id) {
    const page = await dataModule.getPage(id);
    const content = await getFileContent(`'./data/pages/${page.file ?? page.id + '.md'}`);
    return parser.parseMarkdown(content);
}

export async function getFileContent(path) {
    return await dataModule.getTextContent(path);
}