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

    it('should return data if key exist', async () => {
      const res = await cachedRepository.getData('key_2');

      expect(res).toEqual(
        expect.objectContaining({
          key: 'key_2',
          data: expect.objectContaining({ msg: 'dummy' }),
          ttl: 60000,
        }),
      );
    });

    it('should return null if key does not exist', async () => {
      const res = await cachedRepository.getData('key_x');

      expect(res).toBeNull();
    });
  });

  describe('Add CacheData', () => {
    it('should return data object after Add', async () => {
      const res = await cachedRepository.addData(
        'key_00',
        { msg: 'dummy' },
        60000,
      );

      expect(res).toEqual(
        expect.objectContaining({
          _id: expect.anything(),
          key: 'key_00',
          data: expect.objectContaining({ msg: 'dummy' }),
          ttl: 60000,
        }),
      );
    });
  });

  describe('Delete CacheData', () => {
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

    it('should return deletedCount: 1 if key exist', async () => {
      const res = await cachedRepository.deleteData('key_2');
      expect(res).toEqual(expect.objectContaining({ deletedCount: 1 }));
    });

    it('should return deletedCount: 0 if key does not exist', async () => {
      const res = await cachedRepository.deleteData('key_x');
      expect(res).toEqual(expect.objectContaining({ deletedCount: 0 }));
    });

    it('should return deletedCount: 3 for delete all data', async () => {
      const res = await cachedRepository.deleteAll();
      expect(res).toEqual(expect.objectContaining({ deletedCount: 3 }));
    });
  });
});
