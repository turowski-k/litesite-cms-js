import * as moduleRouter from './litesitejs/modules/router.js';
import * as moduleController from './litesitejs/modules/controller.js';

moduleRouter.registerRoute('', moduleController.home);
moduleRouter.registerRoute('blog', moduleController.blog);
moduleRouter.registerRoute('blog/:id', moduleController.blogView);
moduleRouter.registerRoute('blog/:id/*', moduleController.blogView);
moduleRouter.registerRoute('pages', moduleController.pages);
moduleRouter.registerRoute('pages/:id', moduleController.pagesView);
moduleRouter.registerRoute('pages/:id/*', moduleController.pagesView);
moduleRouter.registerRoute('*', moduleController.home);