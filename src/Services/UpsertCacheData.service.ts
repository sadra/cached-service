import { ICacheData } from './../Repository/CacheData.model';
import { ICacheDataRepository } from '../Repository/CacheData.repository.interface';
import { NextFunction, Request, Response } from 'express';
import { DeletedDataDto } from '../Dto/DeletedData.dto';

class UpsertCacheData {
  constructor(private cacheRepository: ICacheDataRepository) {}

  async upsert(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;

      let dataObj: ICacheData = await this.cacheRepository.upsertData(
        key,
        req.body,
        60000,
      );

      res.status(200).send(dataObj);
    } catch (e) {
      next(e);
    }
  }
}

export default UpsertCacheData;
