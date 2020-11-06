import ChatApi from "../api/class-ChatApi.js";
const MIN_STRING_LENGTH = 1;
const MIN_PASSW_LENGTH = 1;
const EMAIL_CHECKER = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_CHECKER = /[a-z]/;
const NO_VALID_CLASS = 'no-valid';
const alerts = {
    badName: 'Без Имени сюда не пустят',
    badSurname: 'Без Фамилии сюда не пустят',
    badlogin: 'Без Логина сюда не пустят',
    badPhone: 'Телефон не может содержать символы [a-z]',
    badEmail: 'Введите корректный email',
    badPass: `Пароль не может быть короче ${MIN_PASSW_LENGTH} символов`,
    NoMatchPass: `Пароль не совпадает`,
    OldPassEmpty: `Введите текущий пароль`,
};
const backEndAlertsElement = '.backend-alerts';
const validatorsMap = {
    validate_first_name: function (elm) {
        const field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
    validate_display_name: function (elm) {
        const field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
    validate_second_name: function (elm) {
        const field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
    validate_login: function (elm) {
        const field = elm;
        if (field.value.length < MIN_STRING_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badlogin;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
    validate_email: function (elm) {
        const field = elm;
        if (!EMAIL_CHECKER.test(field.value.toLowerCase())) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badEmail;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
    validate_phone: function (elm) {
        const field = elm;
        if (PHONE_CHECKER.test(field.value.toLowerCase()) || field.value.length < 3) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badPhone;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
    validate_password: function (elm) {
        const field = elm;
        if (field.value.length < MIN_PASSW_LENGTH) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.badPass;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
    validate_password_repeat: function (elm) {
        const field = elm;
        const password = document.querySelector('input[name="password"]');
        if (field.value !== password.value) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.NoMatchPass;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
    validate_avatar: function (elm) {
        if (elm)
            return true;
    },
    validate_oldPassword: function (elm) {
        if (elm)
            return true;
    },
    validate_newPassword: function (elm) {
        const field = elm;
        const passwordOld = document.querySelector('input[name="oldPassword"]');
        if (field.value > 0 && passwordOld.value.length < 1) {
            let nxtSibling = field.nextElementSibling;
            nxtSibling.innerText = alerts.OldPassEmpty;
            nxtSibling.classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }
        return true;
    },
};
const submitersMap = {
    authorization: function (form, dataFields) {
        const auth = new ChatApi();
        auth.authorization(dataFields)
            .then((responseApi) => {
            if (responseApi !== true) {
                if (document.querySelector(backEndAlertsElement)) {
                    const elm = document.querySelector(backEndAlertsElement);
                    elm.textContent = responseApi;
                }
            }
            else {
                window.location.href = '/chats';
            }
        });
    },
    registration: function (form, dataFields) {
        const reg = new ChatApi();
        reg.registration(dataFields)
            .then((responseApi) => {
            if (responseApi !== true) {
                if (document.querySelector(backEndAlertsElement)) {
                    const elm = document.querySelector(backEndAlertsElement);
                    elm.textContent = responseApi;
                }
            }
            else {
                window.location.href = '/chats';
            }
        });
    },
    userSettings: function (form, dataFields) {
        const upd = new ChatApi();
        if (dataFields.avatar.length !== 0) {
            let formData = new FormData();
            let file = document.querySelector('input[name="avatar"]').files[0];
            formData.append('avatar', file);
            dataFields.avatar = formData;
        }
        upd.updateUserDetails(dataFields)
            .then((responseApi) => {
            console.log(responseApi);
            if (responseApi !== true) {
                let textResponse = ``;
                if (Array.isArray(responseApi)) {
                    responseApi.forEach((responseItem) => {
                        textResponse += responseItem + ' ';
                    });
                    if (document.querySelector(backEndAlertsElement)) {
                        const elm = document.querySelector(backEndAlertsElement);
                        elm.textContent = responseApi;
                    }
                }
                else {
                    if (document.querySelector(backEndAlertsElement)) {
                        const elm = document.querySelector(backEndAlertsElement);
                        elm.textContent = responseApi;
                    }
                }
                setFieldsValue();
            }
            else {
                setFieldsValue();
            }
        });
    },
};
function setFieldsValue() {
    const currentUser = new ChatApi();
    currentUser.getUserDetails()
        .then((userData) => {
        for (let field in userData) {
            if (document.querySelector(`input[name=${field}]`)) {
                if (field === 'avatar' && userData[field]) {
                    document.querySelector(`input[name=${field}]`).parentElement.style.backgroundImage = `url(https://ya-praktikum.tech/${userData[field]})`;
                }
                else {
                    document.querySelector(`input[name=${field}]`).value = userData[field];
                }
            }
        }
    });
}
function registrationFormValidateAll(e) {
    const elm = e.target;
    validatorsMap[`validate_${elm.name}`](elm);
}
function submitValidate(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formType = form.dataset.form_type;
    const fields = form.querySelectorAll('input');
    const errors = [];
    const dataFields = {};
    fields.forEach((elm) => {
        if (!validatorsMap[`validate_${elm.name}`](elm)) {
            errors.push(elm.name);
        }
        else {
            dataFields[elm.name] = elm.value;
        }
    });
    if (errors.length === 0) {
        if (formType) {
            submitersMap[formType](form, dataFields);
        }
        else {
            window.location.href = '/error';
        }
    }
}
function clearAllfields(e) {
    const field = e.target;
    field.classList.remove(NO_VALID_CLASS);
    const nxtSibling = field.nextElementSibling;
    nxtSibling.classList.remove(NO_VALID_CLASS);
    const innText = nxtSibling.dataset.label;
    nxtSibling.textContent = innText || '';
}
export { registrationFormValidateAll, clearAllfields, submitValidate, setFieldsValue };
//# sourceMappingURL=form-functions.js.map