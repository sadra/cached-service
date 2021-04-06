import CacheController from './cache.controller';
import { IndexController } from './index.controller';
import { Application, Router } from 'express';
import CacheDataRepository from '../Repository/CacheData.repository';
import GetCacheData from '../Services/GetCacheData.service';

const getCacheData = new GetCacheData(new CacheDataRepository());

const _routes: [string, Router][] = [
  ['/', IndexController],
  ['/cache', new CacheController(getCacheData).routes()],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
