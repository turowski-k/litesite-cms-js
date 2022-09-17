import * as logging from './logging.js';
import * as config from './config.js';
import * as parser from './parser.js';
import * as data from './data.js';

export async function getPost(id) {
    const post = config.getPost(id);
    const content = await getFileContent(`./data/posts/${post.filename}`);
    return parser.parseMarkdown(content);
}

export async function getPage(id) {
    const page = config.getPage(id);
    const content = await getFileContent(`'./data/pages/${page.filename}`);
    return parser.parseMarkdown(content);
}

export async function getFileContent(path) {
    return await data.getTextContent(path);
}