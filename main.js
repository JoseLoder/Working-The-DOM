
console.log('main.js loaded');
import { htmlToElement } from './services/htmlToElement.mjs';


const nameInput = document.getElementById('name')
const surnameInput = document.getElementById('surname')
const ageInput = document.getElementById('age')
const fields = Array.from(document.querySelector('form').querySelectorAll('input'));
const addButton = document.getElementById('add');
const list = document.getElementById('list');

window.onload = function () {

    nameInput.addEventListener('input', validationField);
    surnameInput.addEventListener('input', validationField);
    ageInput.addEventListener('input', validationField);
    addButton.addEventListener('click', addElement);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addButton.click();
        }
    });
}



function addElement() {

    const name = htmlToElement(`<td>${nameInput.value}</td>`);
    const surname = htmlToElement(`<td>${surnameInput.value}</td>`);
    const age = htmlToElement(`<td>${ageInput.value}</td>`);
    const operation = htmlToElement(`<td></td>`);
    operation.appendChild(createDeleteButton());
    operation.appendChild(createEditButton());
    const row = htmlToElement(`<tr></tr>`);

    row.appendChild(name);
    row.appendChild(surname);
    row.appendChild(age);
    row.appendChild(operation);
    list.appendChild(row);

    nameInput.value = '';
    surnameInput.value = '';
    ageInput.value = '';

    allowAdd();

}

function createDeleteButton() {
    const remove = htmlToElement(`<span class="remove">❌</span>`);
    remove.addEventListener('click', function () {
        remove.parentElement.parentElement.remove();
    });
    return remove;
}

function createEditButton() {

    const edit = htmlToElement(`<span class="edit">✏️</span>`);
    edit.addEventListener('click', function () {
        Array.from(document.querySelectorAll('.edit')).map(element => element.setAttribute('hidden', true));
        Array.from(document.querySelectorAll('.remove')).map(element => element.setAttribute('hidden', true));

        // Get the row and the fields
        const row = edit.parentElement.parentElement;
        const nameField = row.children[0];
        const surnameField = row.children[1];
        const ageField = row.children[2];
        const operationField = row.children[3];

        // Create the input fields
        const nameInput = htmlToElement(`<input class="listField" type="text" value="${nameField.textContent}">`);
        const surnameInput = htmlToElement(`<input class="listField" type="text" value="${surnameField.textContent}">`);
        const ageInput = htmlToElement(`<input class="listField" type="number" value="${ageField.textContent}">`);

        // Replace the text with the input fields
        nameField.textContent = '';
        surnameField.textContent = '';
        ageField.textContent = '';

        // Append the input fields
        nameField.appendChild(nameInput);
        surnameField.appendChild(surnameInput);
        ageField.appendChild(ageInput);

        // Remove the edit button and add the confirm button
        edit.remove();
        const confirm = htmlToElement(`<span class="confirm">✔️</span>`);
        operationField.appendChild(confirm);

        // Add the event to the confirm button
        confirm.addEventListener('click', function () {
            nameField.textContent = nameInput.value;
            surnameField.textContent = surnameInput.value;
            ageField.textContent = ageInput.value;

            nameInput.remove();
            surnameInput.remove();
            ageInput.remove();

            confirm.remove();
            operationField.appendChild(edit);

            // Remove the event from the input fields
            document.removeEventListener('keydown', keyEvents);

            //show the edit and remove buttons
            Array.from(document.querySelectorAll('.edit')).map(element => element.removeAttribute('hidden'));
            Array.from(document.querySelectorAll('.remove')).map(element => element.removeAttribute('hidden'));

        });

        // Add the event to the input fields
        document.addEventListener('keydown', keyEvents);

        function keyEvents(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                confirm.click();
            }
            if (event.key === 'ArrowUp' && row.previousElementSibling) {
                event.preventDefault();
                const beforeRow = row.previousElementSibling;
                beforeRow.before(row);
                console.log('up');
            }
            if (event.key === 'ArrowDown' && row.nextElementSibling) {
                event.preventDefault();
                const afterRow = row.nextElementSibling;
                afterRow.after(row);
            }
        }
    });
    return edit;
}

function validationField() {
    if (this.value === '') {
        this.setCustomValidity(`The ${this.name} cannot be empty.`);
        this.classList.add('fieldError');
        document.querySelector(`.${this.name}Error`).removeAttribute('hidden');
    } else {
        this.setCustomValidity('');
        this.classList.remove('fieldError');
        document.querySelector(`.${this.name}Error`).setAttribute('hidden', true);
    }
    document.querySelector(`.${this.name}Error`).textContent = this.validationMessage;
    allowAdd();
}

function allowAdd() {

    // Check if all fields are filled
    const allFieldsFilled = fields.every(field => field.value !== '');

    // Enable or disable the addButton based on whether all fields are filled
    addButton.disabled = !allFieldsFilled;
}