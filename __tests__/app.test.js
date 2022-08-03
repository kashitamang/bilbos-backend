const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
 
  it('GET /books should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(10);
    expect(res.body[0]).toEqual(
      {
        id: expect.any(Number),
        title: expect.any(String)
      });
  });

  afterAll(() => {
    pool.end();
  });
});
