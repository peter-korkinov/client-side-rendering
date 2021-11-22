import {html, render} from '../node_modules/lit-html/lit-html.js';


const bode = document.querySelector('tbody');
const inputText = document.getElementById('searchField')
let records;

document.querySelector('#searchBtn').addEventListener('click', onClick);

initiate();

async function initiate() {
   const rec = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await rec.json();

   records = Object.values(data);
   records.forEach(rec => rec.match = false);

   updateTable();
}

function onClick() {
   const str = inputText.value.trim();
   console.log(records);
   for (let rec of records) {
      const temp = Object.values(rec).join('|');
      rec.match = (str && temp.includes(str));
   }

   inputText.value = '';
   updateTable();
}

function updateTable() {
   const template = (records) => html`
      ${records.map(record => html`
         <tr class="${record.match ? 'select' : ''}">
            <td>${record.firstName} ${record.lastName}</td>
            <td>${record.email}</td>
            <td>${record.course}</td>
         </tr>`)}
   `;

   render(template(records), bode);
}
