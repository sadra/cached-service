import { ICacheData } from './CacheData.model';

export interface ICacheDataRepository {
  getAllKeys(): Promise<string[]>;
}
