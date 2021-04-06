import { ICacheDataRepository } from './CacheData.repository.interface';
import CacheData, { ICacheData } from '../Repository/CacheData.model';

export default class CacheDataRepository implements ICacheDataRepository {
  async getAllKeys(): Promise<string[]> {
    const data = await CacheData.find();
    return data.map((d) => d.key);
  }
}
