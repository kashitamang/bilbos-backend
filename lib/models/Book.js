const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;

  constructor(row){
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  } 

  //get all 

  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }

  //get by id
};
