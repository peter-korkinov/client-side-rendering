import {html, render} from '../../../node_modules/lit-html/lit-html.js';

import {deleteBook, getAllBooks} from "../api/data.js";
import {displayEditForm} from "./edit.js";


const section = document.getElementById('catalog-section');

const tableTemplate = (books, onEdit, onDelete) => html`
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            ${books.map(book => html`
                <tr>
                    <td>${book[1].author}</td>
                    <td>${book[1].title}</td>
                    <td>
                        <button @click="${onEdit}" value="${book[0]}">Edit</button>
                        <button @click="${onDelete}" value="${book[0]}">Delete</button>
                    </td>
                </tr>
            `)}
        </tbody>
    </table>
`;

async function onDelete(event) {
    await deleteBook(event.target.value);
    displayCatalog();
}

async function displayCatalog() {
    const books = Object.entries(await getAllBooks());

    render(tableTemplate(books, displayEditForm, onDelete), section);
}

export {
    displayCatalog
};