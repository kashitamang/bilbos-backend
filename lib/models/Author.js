const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor({ id, name, dob, pob }){
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.pob = pob;
  } 

  //get all 

  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM authors;');
    return rows.map((row) => new Author(row));
  }

  //get by id
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM authors
      WHERE authors.id = $1`,
      [id]
    );
    return new Author(rows[0]);
  }

  async getBooksByAuthorId(){
    //modifying this instance of this,
    const { rows } = await pool.query(
      `SELECT books.id, title, released 
      from authors
      LEFT JOIN authors_books on authors.id = authors_books.author_id
      LEFT JOIN books on authors_books.book_id = books.id
      WHERE authors.id = $1`, [this.id]);

    this.books = rows;
    return this;
  }

  //insert
  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      `
        INSERT INTO authors (name, dob, pob)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }

};
