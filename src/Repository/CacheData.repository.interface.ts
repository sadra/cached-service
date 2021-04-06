import { ICacheData } from './CacheData.model';

export interface ICacheDataRepository {
  getAllKeys(): Promise<string[]>;
  getData(key: string): Promise<ICacheData | null>;
  addData(key: string, data: object, ttl: number): Promise<ICacheData>;
}
