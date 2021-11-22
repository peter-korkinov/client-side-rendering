import {html, render} from 'https://unpkg.com/lit-html?module';

const displaySpace = document.getElementById('root');
const input = document.getElementById('towns');
const submitBtn = document.getElementById('btnLoadTowns');
submitBtn.addEventListener('click', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    let towns = [];
    if(input.value === '') {
        return alert('Empty input field');
    } else {
        towns = input.value.split(', ');
    }

    const result = template(towns)
    render(result, displaySpace);
    input.value = '';
}

const template = (towns) => html`
    <ul>
        ${towns.map(town => html`<li>${town}</li>`)}
    </ul>
`;