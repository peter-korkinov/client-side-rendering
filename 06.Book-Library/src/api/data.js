import * as api from './api.js';


const getAllBooks = api.getAllBooks;
const getBook = api.getBookById;
const createBook = api.createBook;
const editBook = api.editBookById;
const deleteBook = api.deleteBookById;

export {
    getAllBooks,
    getBook,
    createBook,
    editBook,
    deleteBook
};