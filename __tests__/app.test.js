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
        id: expect.any(String),
        title: expect.any(String),
        released: expect.any(String)
      });
  });
  
  it('GET /books/:id should return book with its authors information', async () => {
    const res = await request(app).get('/books/1');
    expect (res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(String),
      authors: expect.any(Array),
    });
  });

  it('GET /authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(10);
    expect(res.body[0]).toEqual(
      {
        id: expect.any(String),
        name: expect.any(String),
        dob: expect.any(String),
        pob: expect.any(String),
      });
  });

  afterAll(() => {
    pool.end();
  });
});
