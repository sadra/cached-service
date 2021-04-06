import CacheData, { ICacheData } from '../../src/Repository/CacheData.model';
import CacheDataRepository from '../../src/Repository/CacheData.repository';
import { connectDB, clearDatabase, closeDatabase } from './db-handler';

describe('CacheDate Repository', () => {
  /**
   * Connect to a new database before running any tests.
   */
  beforeAll(async () => await connectDB());

  /**
   * Clear all test data after every test.
   */
  afterEach(async () => await clearDatabase());

  /**
   * Remove and close the db and server.
   */
  afterAll(async () => await closeDatabase());

  const cachedRepository = new CacheDataRepository();

  describe('Get CacheData', () => {
    beforeEach(async () => {
      const dummy = [
        {
          key: 'key_1',
          data: { msg: 'dummy' },
          ttl: 60000,
        },
        {
          key: 'key_2',
          data: { msg: 'dummy' },
          ttl: 60000,
        },
        {
          key: 'key_3',
          data: { msg: 'dummy' },
          ttl: 60000,
        },
      ];

      await CacheData.insertMany(dummy);
    });

    it('should return all keys with string[]', async () => {
      const res = await cachedRepository.getAllKeys();
      expect(res).toEqual(expect.arrayContaining(['key_1', 'key_2', 'key_3']));
    });
  });
});
