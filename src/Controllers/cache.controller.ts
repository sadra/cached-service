import { NextFunction, Request, Response, Router } from 'express';
import GetCacheData from '../Server/GetCacheData.service';

export default class CacheController {
  router: Router = Router();

  constructor(private getCacheData: GetCacheData) {}

  routes(): Router {
    this.router.get(
      `/keys`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getCacheData.getAllKeys(req, res, next),
    );

    return this.router;
  }
}