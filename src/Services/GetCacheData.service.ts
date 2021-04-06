import { ICacheDataRepository } from '../Repository/CacheData.repository.interface';
import { NextFunction, Request, Response } from 'express';
import { ICacheData } from '../Repository/CacheData.model';

class GetCacheData {
  constructor(private cacheRepository: ICacheDataRepository) {}

  async getAllKeys(req: Request, res: Response, next: NextFunction) {
    try {
      const keys: string[] = await this.cacheRepository.getAllKeys();

      res.status(200).send(keys);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;
      let data: ICacheData | null = await this.cacheRepository.getData(key);

      console.log(data ? 'Cache hit' : 'Cache miss');

      if (!data) {
        data = await this.cacheRepository.addData(
          this.generateKey(),
          { msg: 'dummy' },
          60000,
        );
      }

      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }

  generateKey(): string {
    return `key_${new Date().getTime()}`;
  }
}

export default GetCacheData;
