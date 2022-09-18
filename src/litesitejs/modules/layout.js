import * as configModule from './config.js';
import * as loggingModule from './logging.js';

const regex = /{{([-]){0,1}([\w\.\-\_]+)(?:\|([\w\.\-\_]+)){0,1}}}/g;
const regexBoilerplate = /{{([=]){0,1}([\w\.\-\_]+)(?:\|([\w\.\-\_]+)){0,1}}}/g;
const regexBody = /{{==}}/g;
const sanitizations = {
    "{": "&lcub;",
    "}": "&rcub;"
}
// {{==}} for boilerplate content container
// [1]: partial modifier: "-" for partial, "=" for boilerplate
// if partial: [2] - partial, [3] - iterator (optional)
// if not partial: [2] - value evaluator, [3] - not used
// {{<boilerplateName}} - used at the beginning of view, signifies the name of the boilerplate to load
// {{>body}} - in boilerplate view, signifies where to put calling view inside

export async function getView(name, viewModel) {
    let view = await fetch(`./litesitejs/themes/${configModule.getTheme()}/views/${name}.html`).then(x => x.text());
    view = await parseElement(view, viewModel);
    view = await attemptBoilerplate(view, viewModel);
    return view;
}

async function loadElement(name) {
    const path = `./litesitejs/themes/${configModule.getTheme()}/partials/${name}.html`;
    const element = await fetch(path).then(el => el.text());
    return element;
}

async function parseElement(element, viewModel) {
    let tag;
    element = parseIfs(element, viewModel);
    while ((tag = regex.exec(element)) !== null) {
        if (tag[1] === '-' && !tag[3]) { // partial for inclusion
            const partial = await loadElement(tag[2]);
            const parsedPartial = await parseElement(partial, viewModel);
            element = replaceTag(element, tag, parsedPartial);
        }
        else if (tag[1] === '-') {
            const iterator = evaluateVariable(tag[3], viewModel);
            const partial = await loadElement(tag[2]);
            let combined = "";
            const regexIndex = regex.lastIndex;
            for (const i of iterator) {
                regex.lastIndex = 0;
                const vm = { iterator: i, parent: viewModel };
                const parsed = await parseElement(partial, vm);
                combined = `${combined}${parsed}`;
            }
            regex.lastIndex = regexIndex;
            element = replaceTag(element, tag, combined);
        }
        else if (!tag[1] && !tag[3]) { // value for evaluation
            const variable = sanitizeVariable(evaluateVariable(tag[2], viewModel));
            element = replaceTag(element, tag, variable);
        }
        regex.lastIndex = 0;
    }
    return element;
}

async function parseIfs(element, viewModel) {
    // this SHOULD be doable with pure regex, but at this point I have no idea how
    // nor if it'd be the most optimal way to go about this
    let loops = 1000;
    const regexIf = /{{\?(.+?)}}/g;
    const regexIfClose = /{{\?}}/g;
    let tag;
    while ((tag = regexIf.exec(element)) !== null || loops > 0) {
        console.log('NEW MAIN LOOP ====================================')
        regexIfClose.lastIndex = regexIf.lastIndex;
        let innerIfsCount = 1;
        let nextClose, nextOpen;
        do {
            console.log('iterate')
            console.log('>>', nextClose?.index, nextOpen?.index);
            nextClose = regexIfClose.exec(element);
            nextOpen = regexIf.exec(element);
            console.log('>>', nextClose?.index, nextOpen?.index);
            if (nextOpen?.index < nextClose?.index) {
                innerIfsCount++;
                nextClose.lastIndex = nextOpen.lastIndex;
                console.log(nextOpen[0], '++', innerIfsCount)
            }
            else {
                innerIfsCount--;
                nextOpen?.lastIndex ?? 0 = nextClose?.lastIndex;
                console.log(nextClose[0], '--', innerIfsCount);
            }
            loops--;
        } while (innerIfsCount > 0 && loops > 0)
        console.log('exiting', loops)
        element = parseIf(element, tag, nextClose, true);
        console.log('ELEMENT:', element);
        regexIf.lastIndex = 0;
        regexIfClose.lastIndex = 0;
        loops--;
    }
}

async function attemptBoilerplate(element, viewModel) {
    regexBoilerplate.lastIndex = 0;
    regexBody.lastIndex = 0;
    const boilerplateTag = regexBoilerplate.exec(element);
    if (!boilerplateTag) return element;
    element = replaceTag(element, boilerplateTag, '');
    let boilerplate = await loadElement(boilerplateTag[2]);
    boilerplate = await parseElement(boilerplate);

    const bodyTag = regexBody.exec(boilerplate);
    // in theory you COULD have a boilerplate without body
    // even though it's a weird design choice...
    if (!bodyTag) return boilerplate;
    return replaceTag(boilerplate, bodyTag, element);
}

function replaceTag(element, tag, replacement) {
    const left = element.substring(0, tag.index);
    const right = element.substring(tag.index + tag[0].length);
    return left + replacement + right;
}

function parseIf(element, openTag, closeTag, hide) {
    const left = element.substring(0, openTag.index);
    const right = element.substring(closeTag.index + closeTag[0].length);
    const middle = element.substring(openTag.index + openTag[0].length, closeTag.index);
    console.log('LEFT', left);
    console.log('MIDDLE', middle);
    console.log('RIGHT', right);
    return hide === true
        ? left + '[x]' + right
        : left + middle + right;
}

function evaluateVariable(path, viewModel) {
    let variable = viewModel;
    for (const node of path.split('.')) {
        variable = variable[node];
    }
    return variable;
}

function sanitizeVariable(variable) {
    if (typeof variable !== 'string') return variable;
    for (const [key, value] of Object.entries(sanitizations)) {
        variable = variable.replaceAll(key, value);
    }
    return variable;
}

function init() {
    const s = document.createElement('link');
    s.rel = 'stylesheet';
    s.href = `./litesitejs/themes/${configModule.getTheme()}/styles.css`;
    s.type = 'text/css';
    document.head.appendChild(s);
    loggingModule.logInfo('Initialized theme CSS');
}

init();