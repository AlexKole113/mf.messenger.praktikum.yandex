import Page from "../../../global/classes/class-Page.js";
import Form from "../../../components/form/control/form.js";
import InputGroup from "../../../components/input-group/control/input-group.js";
import Button from "../../../components/button/control/button.js";
import LoginLink from "../../../components/login-link/control/login-link.js";
import { registrationPage } from "../view/registration.tmp.js";
import { registrationFormValidateAll, clearAllfields, submitValidate } from "../../../global/functions/form-functions.js";
let inputs = [
    {
        type: 'text',
        label: 'Имя',
        name: 'first_name',
    },
    {
        type: 'text',
        label: 'Фамилия',
        name: 'second_name',
    },
    {
        type: 'text',
        label: 'Логин',
        name: 'login',
    },
    {
        type: 'email',
        label: 'email',
        name: 'email',
    },
    {
        type: 'number',
        label: 'Телефон',
        name: 'phone',
    },
    {
        type: 'text',
        label: 'Пароль',
        name: 'password',
    }
];
let button = {
    text: 'Зарегистрироваться',
};
let loginLink = {
    text: 'Войти',
    link: '#'
};
let formProps = {
    title: 'Регистрация',
    inputs: new InputGroup('div#input-component', inputs).getElement(),
    button: new Button('div#btn-component', button).getElement(),
    loggin: new LoginLink('div#logIn-component', loginLink).getElement(),
    handlers: [{ 'blur': registrationFormValidateAll }, { 'input': clearAllfields }, { 'submit': submitValidate }]
};
let form = new Form('div#form-component', formProps);
let page = new Page('main.container', registrationPage, {
    form: form
});
page.render();
//# sourceMappingURL=registration-page.js.map