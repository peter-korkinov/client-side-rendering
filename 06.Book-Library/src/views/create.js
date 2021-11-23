import {html, render} from '../../../node_modules/lit-html/lit-html.js';

import {createBook} from "../api/data.js";
import {displayCatalog} from "./catalog.js";


const section = document.getElementById('form-section');

const createFormTemplate = (onSubmit) => html`
    <form id="add-form" @submit="${onSubmit}">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;

async function onSubmit(event) {
    event.preventDefault();

    const form = section.querySelector('#add-form');

    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');

    if (title ==='' || author === '') {
        return alert('All fields are required');
    }

    form.reset();
    await createBook({title, author});
    displayCatalog();
}

function displayCreateForm() {
    render(createFormTemplate(onSubmit), section);
}

export {
    displayCreateForm
}