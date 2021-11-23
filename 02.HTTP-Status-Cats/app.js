import {html, render} from '../node_modules/lit-html/lit-html.js';

import {cats} from "./catSeeder.js";


const displaySection = document.getElementById('allCats')

const catTemplate = (cat, onToggle) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click="${onToggle}" class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;

const allCatsTemplate = (cats) => html`
    <ul>
        ${cats.map(cat => catTemplate(cat, onToggle))}
    </ul>
`;

function onToggle(event) {
    const cat = event.target.parentElement.querySelector('.status');
    const button = event.target;

    if(cat.style.display === 'none') {
        cat.style.display = '';
        button.textContent = 'Hide status code';
    } else {
        cat.style.display = 'none';
        button.textContent = 'Show status code';
    }
}

const result = allCatsTemplate(cats);
render(result, displaySection);