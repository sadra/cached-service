import { IndexController } from './index.controller';
import { Application, Router } from 'express';

const _routes: [string, Router][] = [['/', IndexController]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
