import { htmlToElement } from './services/htmlToElement.mjs';


// window.onload = function () {
//     const element = htmlToElement(`<div>Hello, World!</div>`);
//     document.getElementById('main').appendChild(element);
// }

const nameInput = document.getElementById('name').addEventListener('input', validationField);
const surnameInput = document.getElementById('surname').addEventListener('input', validationField);
const ageInput = document.getElementById('age').addEventListener('input', validationField);
const fields = Array.from(document.querySelector('form').querySelectorAll('input'));
const add = document.getElementById('add').addEventListener('click', addElement);
const list = document.getElementById('list');

window.onload = function () {

    //establecer todos los campos como invalidos por defecto


}

function validationField() {
    if (this.value === '') {
        this.setCustomValidity(`The ${this.name} cannot be empty.`);
        this.classList.add('fieldError');
    } else {
        this.setCustomValidity('');
        this.classList.remove('fieldError');
    }
    document.querySelector(`.${this.name}Error`).textContent = this.validationMessage;
    allowAdd();
}

function addElement() {

    const name = htmlToElement(`<td>${nameInput.value}</td>`);
    const surname = htmlToElement(`<td>${surnameInput.value}</td>`);
    const age = htmlToElement(`<td>${ageInput.value}</td>`);
    const operation = htmlToElement(`<td></td>`).appendChild(createRemove());
    const row = htmlToElement(`<tr></tr>`);

    row.appendChild(name);
    row.appendChild(surname);
    row.appendChild(age);
    row.appendChild(operation);
    list.appendChild(row);

    nameInput.value = '';
    surnameInput.value = '';
    ageInput.value = '';

}

function createRemove() {
    const remove = htmlToElement(`<span class="remove">❌</span>`);
    remove.addEventListener('click', function () {
        remove.parentElement.parentElement.remove();
    });
    return remove;
}

function allowAdd() {

    fields.every((field) => field.validity.valid) ? add.disabled = false : add.disabled = true;

}