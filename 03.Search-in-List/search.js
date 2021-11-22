import {html, render} from '../node_modules/lit-html/lit-html.js';

import {towns as townsNames} from "./towns.js";

const towns = townsNames.map(town => ({name: town, match: false}));

const townsDiv = document.getElementById('towns');
const matchesDiv = document.getElementById('result');
const searchInput = document.getElementById('searchText');
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', onSearch);

function search() {
    update();
}

function update() {
    render(townsTemplate(towns), townsDiv);
}

function onSearch() {
    const str = searchInput.value.trim().toLocaleLowerCase();
    let matches = 0;

    for (let town of towns) {
        if (str && town.name.toLocaleLowerCase().includes(str)) {
            town.match = true;
            matches++;
        } else {
            town.match = false;
        }
    }

    update();
    render(matchesTemplate(matches), matchesDiv);
}

const townsTemplate = (towns) => html`
    <ul id="townsList">
        ${towns.map(town => html`<li class="${town.match ? 'active' : ''}">${town.name}</li>`)}
    </ul>`;

const matchesTemplate = (matchesNum) => html`${matchesNum} matches found`;

search();