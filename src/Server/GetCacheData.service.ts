import { ICacheDataRepository } from './../Repository/CacheData.repository.interface';
import { NextFunction, Request, Response } from 'express';

class GetCacheData {
  constructor(private cacheRepository: ICacheDataRepository) {}

  async getAllKeys(req: Request, res: Response, next: NextFunction) {
    try {
      const keys: string[] = await this.cacheRepository.getAllKeys();

      res.status(200).send(keys);
    } catch (e) {
      next(e);
    }
  }
}

export default GetCacheData;
