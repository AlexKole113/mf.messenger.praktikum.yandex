import Page from "../../../global/classes/class-Page";
import Form from "../../../components/form/control/form";
import InputGroup from "../../../components/input-group/control/input-group";
import Button from "../../../components/button/control/button";
import LoginLink from "../../../components/login-link/control/login-link";

import {registrationPage} from "../view/registration.tmp";

import { registrationFormValidateAll, clearAllfields, submitValidate } from "../../../global/functions/form-functions";


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
}
let additional = {
    text: 'Войти',
    link: '/auth'
}

let formProps = {
    title: 'Регистрация',
    formType: 'registration',
    inputs: new InputGroup('div#input-component', inputs ).getElement(),
    button: new Button('div#btn-component', button ).getElement(),
    additional: new LoginLink('div#logIn-component', additional ).getElement(),
    handlers: [{ 'blur': registrationFormValidateAll },{ 'input': clearAllfields }, { 'submit': submitValidate }]
}

let form = new Form('div#form-component', formProps )
let pageRegistration = new Page( 'main.container', registrationPage, {
    form: form
});

export {pageRegistration}

