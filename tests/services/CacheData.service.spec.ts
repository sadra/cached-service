import { ICacheDataRepository } from '../../src/Repository/CacheData.repository.interface';
import GetCacheData from '../../src/Services/GetCacheData.service';
import DeleteCacheData from '../../src/Services/DeleteCacheData.service';
import UpsertCacheData from '../../src/Services/UpsertCacheData.service';

import { NextFunction, Request, Response } from 'express';

describe('Cache Service Data', () => {
  let cacheDataRepository: ICacheDataRepository;
  let getCacheDataService: GetCacheData;
  let deleteCacheData: DeleteCacheData;
  let upsertCacheData: UpsertCacheData;

  const mockRequest = {} as Request;
  const mockResponse = {} as Response;
  let mockNextFunction = {} as NextFunction;

  let dummyData = {
    _id: '606c968569a73d64845a72bf',
    key: 'key_1617729157563',
    data: { msg: 'dummy' },
    date: '2021-04-06T17:12:37.568Z',
    __v: 0,
  };

  let dummeyKeys = ['key_1', 'key_2', 'key_3'];

  let dummeyDeleteCount = { deletedCount: 1 };

  beforeEach(() => {
    cacheDataRepository = {
      getAllKeys: jest.fn().mockResolvedValue(dummeyKeys),
      getData: jest.fn().mockResolvedValue(dummyData),
      addData: jest.fn().mockResolvedValue(dummyData),
      deleteData: jest.fn().mockResolvedValue(dummeyDeleteCount),
      deleteAll: jest.fn().mockResolvedValue(dummeyDeleteCount),
      upsertData: jest.fn().mockResolvedValue(dummyData),
    };

    mockNextFunction = jest.fn();
    mockResponse.status = jest.fn().mockReturnThis();
    mockResponse.send = jest.fn();

    getCacheDataService = new GetCacheData(cacheDataRepository);
    deleteCacheData = new DeleteCacheData(cacheDataRepository);
    upsertCacheData = new UpsertCacheData(cacheDataRepository);
  });

  describe('Get Data', () => {
    it('should cacheDataRepository.getAllKeys and pass dummyKeys as the response', async () => {
      const res = await getCacheDataService.getAllKeys(
        mockRequest,
        mockResponse,
        mockNextFunction,
      );
      expect(cacheDataRepository.getAllKeys).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.send).toBeCalledWith(dummeyKeys);
    });

    it('should call getData with key, and pass dummyData as the response', async () => {
      mockRequest.params = {
        key: 'key_1',
      };

      const res = await getCacheDataService.getData(
        mockRequest,
        mockResponse,
        mockNextFunction,
      );

      expect(cacheDataRepository.getData).toBeCalledWith('key_1');
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.send).toBeCalledWith(dummyData);
    });

    it('should call addData if getData returns null, and pass correct data', async () => {
      mockRequest.params = {
        key: 'key_1',
      };
      cacheDataRepository.getData = jest.fn().mockResolvedValue(null);

      const res = await getCacheDataService.getData(
        mockRequest,
        mockResponse,
        mockNextFunction,
      );

      expect(cacheDataRepository.getData).toBeCalledWith('key_1');
      expect(cacheDataRepository.addData).toBeCalledWith(expect.any(String), {
        msg: 'dummy',
      });
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.send).toBeCalledWith(dummyData);
    });
  });

  describe('Delete Data', () => {
    it('should call delete with key, and pass deleted Count', async () => {
      mockRequest.params = {
        key: 'key_1',
      };

      const res = await deleteCacheData.deleteData(
        mockRequest,
        mockResponse,
        mockNextFunction,
      );

      expect(cacheDataRepository.deleteData).toBeCalledWith('key_1');
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.send).toBeCalledWith(dummeyDeleteCount);
    });

    it('should call deleteAll, and pass deleted Count', async () => {
      const res = await deleteCacheData.deleteAll(
        mockRequest,
        mockResponse,
        mockNextFunction,
      );

      expect(cacheDataRepository.deleteAll).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.send).toBeCalledWith(dummeyDeleteCount);
    });
  });

  describe('Upsert Data', () => {
    it('should cacheDataRepository.getAllKeys and pass dummyKeys as the response', async () => {
      mockRequest.params = { key: 'key_1' };
      mockRequest.body = { msg: 'dummy' };

      const res = await upsertCacheData.upsert(
        mockRequest,
        mockResponse,
        mockNextFunction,
      );

      expect(cacheDataRepository.upsertData).toBeCalledWith('key_1', {
        msg: 'dummy',
      });
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.send).toBeCalledWith(dummyData);
    });
  });
});
