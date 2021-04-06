import { ICacheDataRepository } from './../../src/Repository/CacheData.repository.interface';
import GetCacheData from './../../src/Services/GetCacheData.service';
import { NextFunction, Request, Response } from 'express';

describe('Get Cache Service Data', () => {
  let cacheDataRepository: ICacheDataRepository;
  let getCacheDataService: GetCacheData;

  const mockRequest = {} as Request;
  const mockResponse = {} as Response;
  let mockNextFunction = {} as NextFunction;

  let dummyData = {
    ttl: 60000,
    _id: '606c968569a73d64845a72bf',
    key: 'key_1617729157563',
    data: { msg: 'dummy' },
    date: '2021-04-06T17:12:37.568Z',
    __v: 0,
  };

  let dummeyKeys = ['key_1', 'key_2', 'key_3'];

  beforeEach(() => {
    cacheDataRepository = {
      getAllKeys: jest.fn().mockResolvedValue(dummeyKeys),
      getData: jest.fn().mockResolvedValue(dummyData),
      addData: jest.fn().mockResolvedValue(dummyData),
    };

    mockNextFunction = jest.fn();
    mockResponse.status = jest.fn().mockReturnThis();
    mockResponse.send = jest.fn();

    getCacheDataService = new GetCacheData(cacheDataRepository);
  });

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
    expect(cacheDataRepository.addData).toBeCalledWith(
      expect.any(String),
      { msg: 'dummy' },
      60000,
    );
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(dummyData);
  });
});
