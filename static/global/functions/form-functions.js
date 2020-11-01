const MIN_STRING_LENGTH = 2;
const MIN_PASSW_LENGTH = 8;
const EMAIL_CHECKER = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_CHECKER = /[a-z]/;
const noValidClass = 'no-valid';
const alerts = {
    badName: 'Без Имени сюда не пустят',
    badSurname: 'Без Фамилии сюда не пустят',
    badlogin: 'Без Логина сюда не пустят',
    badPhone: 'Телефон не может содержать символы [a-z]',
    badEmail: 'Введите корректный email',
    badPass: `Пароль должен быть длиннее ${MIN_PASSW_LENGTH} символов`,
};
const validatorsMap = {
    validate_first_name: function (elm) {
        const field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_second_name: function (elm) {
        const field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_login: function (elm) {
        const field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badlogin;
            nxtSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_email: function (elm) {
        const field = elm;
        if (!EMAIL_CHECKER.test(field.value.toLowerCase())) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badEmail;
            nxtSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_phone: function (elm) {
        const field = elm;
        if (PHONE_CHECKER.test(field.value.toLowerCase()) || field.value.length < 3) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badPhone;
            nxtSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_password: function (elm) {
        const field = elm;
        if (field.value.length < MIN_PASSW_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badPass;
            nxtSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }
        return true;
    },
    validate_avatar: function (elm) {
        if (!elm)
            return true;
        return false;
    },
};
function registrationFormValidateAll(e) {
    const elm = e.target;
    validatorsMap[`validate_${elm.name}`](elm);
}
function submitValidate(e) {
    const form = e.currentTarget;
    const fields = form.querySelectorAll('input');
    const errors = [];
    fields.forEach((elm) => {
        if (!validatorsMap[`validate_${elm.name}`](elm)) {
            errors.push(elm.name);
        }
    });
    if (errors.length > 0) {
        e.preventDefault();
    }
    else {
        e.preventDefault();
        window.location.href = '/users';
    }
}
function clearAllfields(e) {
    const field = e.target;
    field.classList.remove(noValidClass);
    const nxtSibling = field.nextElementSibling;
    nxtSibling.classList.remove(noValidClass);
    const innText = nxtSibling.dataset.label;
    nxtSibling.textContent = innText || '';
}
export { registrationFormValidateAll, clearAllfields, submitValidate };
//# sourceMappingURL=form-functions.js.map