import { ICacheDataRepository } from './CacheData.repository.interface';
import CacheData, { ICacheData } from '../Repository/CacheData.model';

export default class CacheDataRepository implements ICacheDataRepository {
  async addData(key: string, data: object, ttl: number): Promise<ICacheData> {
    const dataModel = new CacheData({
      key,
      data,
      ttl,
    });

    return await dataModel.save();
  }

  async getData(key: string): Promise<ICacheData | null> {
    return await CacheData.findOne({ key });
  }

  async getAllKeys(): Promise<string[]> {
    const data = await CacheData.find();
    return data.map((d) => d.key);
  }
}
