import { NextFunction, Request, Response, Router } from 'express';
import DeleteCacheData from '../Services/DeleteCacheData.service';
import GetCacheData from '../Services/GetCacheData.service';
import UpsertCacheData from '../Services/UpsertCacheData.service';

export default class CacheController {
  router: Router = Router();

  constructor(
    private getCacheData: GetCacheData,
    private deleteCacheData: DeleteCacheData,
    private upsertCacheData: UpsertCacheData,
  ) {}

  routes(): Router {
    this.router
      .get(`/keys`, (req: Request, res: Response, next: NextFunction) =>
        this.getCacheData.getAllKeys(req, res, next),
      )
      .get(`/keys/:key`, (req: Request, res: Response, next: NextFunction) =>
        this.getCacheData.getData(req, res, next),
      );

    this.router
      .delete(`/keys/`, (req: Request, res: Response, next: NextFunction) =>
        this.deleteCacheData.deleteAll(req, res, next),
      )
      .delete(`/keys/:key`, (req: Request, res: Response, next: NextFunction) =>
        this.deleteCacheData.deleteData(req, res, next),
      );

    this.router.put(
      `/keys/:key`,
      (req: Request, res: Response, next: NextFunction) =>
        this.upsertCacheData.upsert(req, res, next),
    );

    return this.router;
  }
}
