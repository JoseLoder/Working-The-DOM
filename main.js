import { htmlToElement } from './services/htmlToElement.mjs';


// window.onload = function () {
//     const element = htmlToElement(`<div>Hello, World!</div>`);
//     document.getElementById('main').appendChild(element);
// }

let namee = document.getElementById('name');
let surname = document.getElementById('surname');
let age = document.getElementById('age');

window.onload = function () {

    let add = document.getElementById('add');
    let list = document.getElementById('list');
    add.addEventListener('click', addElement);

}

function addElement() {
    createPerson();


    const element = htmlToElement(`<div>${person.name} ${person.surname} ${person.age}</div>`);
    list.appendChild(element);

}
function createPerson() {
    const person = {
        name: namee.value,
        surname: surname.value,
        age: age.value
    }
    return person;
}