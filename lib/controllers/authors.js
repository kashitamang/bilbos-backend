const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Author.getById(req.params.id);
    res.json(data);
  })

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
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Author.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
