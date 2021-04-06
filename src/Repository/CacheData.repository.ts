import { ICacheDataRepository } from './CacheData.repository.interface';
import CacheData, { ICacheData } from '../Repository/CacheData.model';
import { DeletedDataDto } from '../Dto/DeletedData.dto';
require('dotenv').config();

export default class CacheDataRepository implements ICacheDataRepository {
  async upsertData(key: string, data: object): Promise<ICacheData> {
    let dataObj = await CacheData.findOne({ key });

    if (!dataObj) {
      return await this.addData(key, data);
    }
    dataObj.data = data;

    return await dataObj.save();
  }

  async deleteAll(): Promise<DeletedDataDto> {
    const res = await CacheData.deleteMany({});
    return { deletedCount: res.deletedCount!! | 0 };
  }

  async deleteData(key: string): Promise<DeletedDataDto> {
    const res = await CacheData.deleteOne({ key });
    return { deletedCount: res.deletedCount!! | 0 };
  }

  async addData(key: string, data: object): Promise<ICacheData> {
    const dataModel = new CacheData({
      key,
      data,
    });

    await this.checkLimits();
    return await dataModel.save();
  }

  async getData(key: string): Promise<ICacheData | null> {
    return await CacheData.findOne({ key });
  }

  async getAllKeys(): Promise<string[]> {
    const data = await CacheData.find();
    return data.map((d) => d.key);
  }

  async checkLimits() {
    const count = await CacheData.count();
    const limit = +process.env.CACHE_LIMIT!!;
    if (count >= limit) {
      const oldest = await CacheData.find({}).sort({ date: -1 });
      await CacheData.deleteOne({ key: oldest[0].key });
    }
  }
}
