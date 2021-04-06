import { ICacheDataRepository } from '../Repository/CacheData.repository.interface';
import { NextFunction, Request, Response } from 'express';
import { DeletedDataDto } from '../Dto/DeletedData.dto';

class DeleteCacheData {
  constructor(private cacheRepository: ICacheDataRepository) {}

  async deleteData(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;
      let data: DeletedDataDto = await this.cacheRepository.deleteData(key);

      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }

  async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      let data: DeletedDataDto = await this.cacheRepository.deleteAll();

      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }
}

export default DeleteCacheData;
