
export function validationField() {
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

export function allowAdd() {

    // Check if all fields are filled
    const allFieldsFilled = fields.every(field => field.value !== '');

    // Enable or disable the addButton based on whether all fields are filled
    addButton.disabled = !allFieldsFilled;
}