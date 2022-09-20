import * as dataModule from './data.js';

export function getTheme() {
    return "default";
}

export async function getMenu() {
    const config = await dataModule.getConfig();
    return config.menu;
}