import * as moduleRouter from './litesitejs/modules/router.js';
import * as moduleController from './litesitejs/modules/controller.js';

moduleRouter.registerRoute('blog/:id/*', moduleController.blogView);
moduleRouter.registerRoute('blog/:id', moduleController.blogView);
moduleRouter.registerRoute('blog', moduleController.blog);
moduleRouter.registerRoute('pages/:id/*', moduleController.pagesView);
moduleRouter.registerRoute('pages/:id', moduleController.pagesView);
moduleRouter.registerRoute('pages', moduleController.pages);
moduleRouter.registerRoute('*', moduleController.home);