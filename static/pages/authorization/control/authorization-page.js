import Page from "../../../global/classes/class-Page.js";
import Form from "../../../components/form/control/form.js";
import InputGroup from "../../../components/input-group/control/input-group.js";
import Button from "../../../components/button/control/button.js";
import LoginLink from "../../../components/login-link/control/login-link.js";
import { registrationPage } from "../view/authorization.tmp.js";
import { registrationFormValidateAll, clearAllfields, submitValidate } from "../../../global/functions/form-functions.js";
let inputs = [
    {
        type: 'text',
        label: 'Логин',
        name: 'login',
    },
    {
        type: 'text',
        label: 'Пароль',
        name: 'password',
    }
];
let button = {
    text: 'Войти',
};
const forgotPassLink = new LoginLink('div#logIn-component', {
    text: 'Забыли пароль',
    link: '#'
}).getElement();
const registerLink = new LoginLink('div#logIn-component', {
    text: 'Регистрация',
    link: '/registration'
}).getElement();
let formProps = {
    title: 'Авторизация',
    formType: 'authorization',
    inputs: new InputGroup('div#input-component', inputs).getElement(),
    button: new Button('div#btn-component', button).getElement(),
    additional: forgotPassLink + registerLink,
    handlers: [{ 'blur': registrationFormValidateAll }, { 'input': clearAllfields }, { 'submit': submitValidate }]
};
let form = new Form('div#form-component', formProps);
let pageAuthorization = new Page('main.container', registrationPage, {
    form: form
});
export { pageAuthorization };
//# sourceMappingURL=authorization-page.js.map