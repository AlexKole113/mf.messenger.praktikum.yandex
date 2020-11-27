import Page from "../../../global/classes/class-Page";
import Form from "../../../components/form/control/form.js";
import InputGroup from "../../../components/input-group/control/input-group";
import Button from "../../../components/button/control/button";
import LoginLink from "../../../components/login-link/control/login-link";

import {registrationPage} from "../view/authorization.tmp";

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
}

const forgotPassLink = new LoginLink('div#logIn-component', {
    text: 'Забыли пароль',
    link: '#'
} ).getElement();

const registerLink = new LoginLink('div#logIn-component', {
    text: 'Регистрация',
    link: '/registration'
} ).getElement();


let formProps = {
    title: 'Авторизация',
    formType: 'authorization',
    inputs: new InputGroup('div#input-component', inputs ).getElement(),
    button: new Button('div#btn-component', button ).getElement(),
    additional: forgotPassLink + registerLink,
    handlers: [{ 'blur': registrationFormValidateAll },{ 'input': clearAllfields }, { 'submit': submitValidate }]
}

let form = new Form('div#form-component', formProps )
let pageAuthorization = new Page( 'main.container', registrationPage, {
    form: form
});



export {pageAuthorization};

