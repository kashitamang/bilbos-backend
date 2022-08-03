const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Book.getById(req.params.id);
    res.json(data);
  })

  .get('/', async (req, res) => {
    // console.log(books);
    const books = await Book.getAll();
    // console.log(books);
    const ids = books.map((book) => ({ 
      id: book.id, 
      title: book.title,
      released: book.released
    }));
    // console.log(ids);
    res.json(ids);
  });
