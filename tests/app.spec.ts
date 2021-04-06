import { app } from '../src/bin/app';
import request from 'supertest';

describe('Index e2e Test', () => {
  it('should recieved ok message', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual('Hello I am Cached Server');
  });
});
