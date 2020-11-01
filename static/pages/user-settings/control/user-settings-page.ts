import Page from "../../../global/classes/class-Page.js";
import Form from "../../../components/form/control/form.js";
import InputGroup from "../../../components/input-group/control/input-group.js";
import InputFile from "../../../components/input-file/control/input-file.js";
import Button from "../../../components/button/control/button.js";
import LoginLink from "../../../components/login-link/control/login-link.js";

import {registrationPage} from "../view/user-settings.tmp.js";

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
        label: 'Логин',
        name: 'login',
    },
    {
        type: 'text',
        label: 'Пароль',
        name: 'password',
    },
    {
        type: 'text',
        label: 'Пароль еще раз',
        name: 'password',
    }
];
let button = {
    text: 'Сохранить',
}
let loginLink = {
    text: 'Войти',
    link: '#'
}

let avatar = {
    photo: 'https://cdn.pixabay.com/photo/2017/05/11/08/48/model-2303361_1280.jpg',
    name: 'avatar'
};

let uploadAvatar = new InputFile('div#input-file-component', avatar );

let formProps = {
    title: 'Настройки пользователя',
    inputfile: uploadAvatar.getElement(),
    inputs: new InputGroup('div#input-component', inputs ).getElement(),
    button: new Button('div#btn-component', button ).getElement(),
    loggin: new LoginLink('div#logIn-component', loginLink ).getElement(),
    handlers: [{ 'blur': registrationFormValidateAll },{ 'input': clearAllfields }, { 'submit': submitValidate }]
}

let form = new Form('div#form-component', formProps )
let pageUserSettings = new Page( 'main.container', registrationPage, {
    form: form
});


export {pageUserSettings}
