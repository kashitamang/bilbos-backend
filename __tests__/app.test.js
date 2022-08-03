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
      });
  });

  it('GET /authors/:id should return author with all its information', async () => {
    const res = await request(app).get('/authors/1');
    expect (res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
    });
  });

  it('POST /books should add a new book', async () => {
    const newBook = {
      title: 'Life of Kashi',
      released: '2023'
    };

    const resp = await request(app).post('/books').send(newBook);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      title: 'Life of Kashi',
      released: '2023',
      authors: expect.any(Array)
    });
  });

  afterAll(() => {
    pool.end();
  });
});
