import Page from "../../../global/classes/class-Page";
import Form from "../../../components/form/control/form";
import InputGroup from "../../../components/input-group/control/input-group";
import InputFile from "../../../components/input-file/control/input-file";
import Button from "../../../components/button/control/button";

import {registrationPage} from "../view/user-settings.tmp";

import { registrationFormValidateAll, clearAllfields, submitValidate, setFieldsValue } from "../../../global/functions/form-functions.js";


let inputs = [
    {
        type: 'text',
        label: 'Имя',
        name: 'first_name',
    },
    {
        type: 'text',
        label: 'Ник',
        name: 'display_name',
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
        label: 'Пароль старый',
        name: 'oldPassword',
    },
    {
        type: 'text',
        label: 'Пароль новый',
        name: 'newPassword',
    }
];
let button = {
    text: 'Сохранить',
}

let avatar = {
    photo: '',
    name: 'avatar'
};

let uploadAvatar = new InputFile('div#input-file-component', avatar );

let formProps = {
    title: 'Настройки пользователя',
    formType: 'userSettings',
    inputfile: uploadAvatar.getElement(),
    inputs: new InputGroup('div#input-component', inputs ).getElement(),
    button: new Button('div#btn-component', button ).getElement(),
    additional: '',
    handlers: [{ 'blur': registrationFormValidateAll },{ 'input': clearAllfields }, { 'submit': submitValidate }]
}

let form = new Form('div#form-component', formProps )
let pageUserSettings = new Page( 'main.container', registrationPage, {
    form: form,
    handlers: [{ 'render': setFieldsValue }],
});

export {pageUserSettings}
