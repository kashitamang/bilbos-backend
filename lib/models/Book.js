const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;
  authors;

  constructor({ id, title, released, authors }){
    this.id = id;
    this.title = title;
    this.released = released;
    this.authors = authors ?? [];
  } 

  //get all 

  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }
  
  //get by id

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT books.id, title, released,
      json_agg(to_jsonb(authors))
      as authors from books
      LEFT JOIN authors_books on books.id = authors_books.book_id
      LEFT JOIN authors on authors_books.author_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }

  //post 

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `
        INSERT INTO books (title, released)
        VALUES ($1, $2)
        RETURNING *
      `,
      [title, released]
    );
    return new Book(rows[0]);
  }
};
