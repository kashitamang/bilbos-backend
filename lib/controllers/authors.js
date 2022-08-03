const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    // console.log(authors);
    const authors = await Author.getAll();
    // console.log(authors);
    const ids = authors.map((author) => ({ 
      id: author.id, 
      name: author.name
    }));
    // console.log(ids);
    res.json(ids);
  });
