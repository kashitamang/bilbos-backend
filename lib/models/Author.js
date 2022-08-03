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
};
