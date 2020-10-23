const MIN_STRING_LENGTH = 2;
const MIN_PASSW_LENGTH = 8;
const noValidClass = 'no-valid';
const alerts = {
    badName: 'Без Имени сюда не пустят',
    badSurname: 'Без Фамилии сюда не пустят',
    badlogin: 'Без Логина сюда не пустят',
    badPhone: 'Телефон не может содержать символы [a-z]',
    badEmail: 'Введите корректный email',
    badPass: `Пароль должен быть длиннее ${MIN_PASSW_LENGTH} символов`,
};
const validateFunctions = {
    validate_first_name: function (elm) {
        let field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            field.nextElementSibling.innerText = alerts.badName;
            field.nextElementSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_second_name: function (elm) {
        return this.validate_first_name(elm);
    },
    validate_login: function (elm) {
        let field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            field.nextElementSibling.innerText = alerts.badlogin;
            field.nextElementSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_email: function (elm) {
        let field = elm;
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!re.test(field.value.toLowerCase())) {
            field.nextElementSibling.innerText = alerts.badEmail;
            field.nextElementSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_phone: function (elm) {
        let field = elm;
        let re = /[a-z]/;
        if (re.test(field.value.toLowerCase()) || field.value.length < 3) {
            field.nextElementSibling.innerText = alerts.badPhone;
            field.nextElementSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_password: function (elm) {
        let field = elm;
        if (field.value.length < MIN_PASSW_LENGTH) {
            field.nextElementSibling.innerText = alerts.badPass;
            field.nextElementSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_avatar: function (elm) {
        return true;
    },
};
function registrationFormValidateAll(e) {
    validateFunctions[`validate_${e.target.name}`](e.target);
}
function submitValidate(e) {
    let fields = this.querySelectorAll('input');
    let errors = [];
    fields.forEach((elm) => {
        if (!validateFunctions[`validate_${elm.name}`](elm)) {
            errors.push(elm.name);
        }
    });
    if (errors.length > 0) {
        e.preventDefault();
    }
}
function clearAllfields(e) {
    let field = e.target;
    field.classList.remove(noValidClass);
    field.nextElementSibling.classList.remove(noValidClass);
    field.nextElementSibling.innerText = field.nextElementSibling.dataset.label;
}
export { registrationFormValidateAll, clearAllfields, submitValidate };
//# sourceMappingURL=form-functions.js.map