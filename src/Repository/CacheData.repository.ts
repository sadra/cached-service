import { ICacheDataRepository } from './CacheData.repository.interface';
import CacheData, { ICacheData } from '../Repository/CacheData.model';
import { DeletedDataDto } from '../Dto/DeletedData.dto';

export default class CacheDataRepository implements ICacheDataRepository {
  async deleteData(key: string): Promise<DeletedDataDto> {
    const res = await CacheData.deleteOne({ key });
    return { deletedCount: res.deletedCount!! | 0 };
  }

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
