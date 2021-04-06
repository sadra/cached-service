import { NextFunction, Request, Response, Router } from 'express';
import DeleteCacheData from '../Services/DeleteCacheData.service';
import GetCacheData from '../Services/GetCacheData.service';

export default class CacheController {
  router: Router = Router();

  constructor(
    private getCacheData: GetCacheData,
    private deleteCacheData: DeleteCacheData,
  ) {}

  routes(): Router {
    this.router.get(
      `/keys`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getCacheData.getAllKeys(req, res, next),
    );

    this.router.get(
      `/keys/:key`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getCacheData.getData(req, res, next),
    );

    this.router.delete(
      `/keys/:key`,
      (req: Request, res: Response, next: NextFunction) =>
        this.deleteCacheData.deleteData(req, res, next),
    );

    return this.router;
  }
}
