import {html, render} from '../../../node_modules/lit-html/lit-html.js';

import {editBook, getBook} from "../api/data.js";
import {displayCatalog} from "./catalog.js";
import {displayCreateForm} from "./create.js";


const section = document.getElementById('form-section');
let bookId;

const editFormTemplate = (book, onSave) => html`
    <form id="edit-form" @submit="${onSave}">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" value="${book.title}">
        <label>AUTHOR</label>
        <input type="text" name="author" value="${book.author}">
        <input type="submit" value="Save">
    </form>
`;

async function onSave(event) {
    event.preventDefault();

    const form = section.querySelector('#edit-form');

    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');

    if (title ==='' || author === '') {
        return alert('All fields are required');
    }

    form.reset();
    await editBook(bookId, {title, author});
    await displayCatalog();
    displayCreateForm();
}


async function displayEditForm(event) {
    bookId = event.target.value;
    const book = await getBook(bookId);

    render(editFormTemplate(book, onSave), section)
}

export {
    displayEditForm
}