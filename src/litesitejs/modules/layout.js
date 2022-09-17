import * as configModule from './config.js';

const regex = /{{(>){0,1}([\w\.\-\_]+)(?:\|([\w\.\-\_])+){0,1}}}/g;
// [1]: partial modifier
// if partial: [2] - partial, [3] - iterator (optional)
// if not partial: [2] - value evaluator, [3] - iterator (optional)


function loadElement(name) {
    const path = `./themes/${configModule.getTheme()}/${name}.html`;
}

function parseElement(element) {

}