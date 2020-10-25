const MIN_STRING_LENGTH  = 2;
const MIN_PASSW_LENGTH   = 8;
const EMAIL_CHECKER      = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_CHECKER      = /[a-z]/;

const noValidClass       = 'no-valid';
const alerts             = {
    badName    : 'Без Имени сюда не пустят',
    badSurname : 'Без Фамилии сюда не пустят',
    badlogin   : 'Без Логина сюда не пустят',
    badPhone   : 'Телефон не может содержать символы [a-z]',
    badEmail   : 'Введите корректный email',
    badPass    : `Пароль должен быть длиннее ${MIN_PASSW_LENGTH} символов`,
}


type Validator = (T: HTMLInputElement) => boolean;
type ValidatorsMap = Record<string, Validator>;


const validatorsMap :ValidatorsMap = {

    validate_first_name :   <Validator> function ( elm:HTMLInputElement  ) :boolean {
        const field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }
        return true
    },

    validate_second_name :  <Validator> function ( elm:HTMLInputElement )  :boolean {
        const field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }
        return true
    },

    validate_login :        <Validator>  function( elm:HTMLInputElement )  :boolean {
        const field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling .innerText = alerts.badlogin;
            nxtSibling .classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }

        return true
    },

    validate_email :        <Validator> function( elm:HTMLInputElement )   :boolean {
        const field = elm;
        if( !EMAIL_CHECKER.test(field.value.toLowerCase()) ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badEmail;
            nxtSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }

        return true
    },

    validate_phone :        <Validator> function( elm:HTMLInputElement )   :boolean {
        const field = elm;
        if( PHONE_CHECKER.test(field.value.toLowerCase()) || field.value.length < 3 ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling .innerText = alerts.badPhone;
            nxtSibling .classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }

        return true
    },

    validate_password :     <Validator> function( elm:HTMLInputElement )   :boolean {
        const field = elm;
        if( field.value.length < MIN_PASSW_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badPass;
            nxtSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false;
        }

        return true
    },

    validate_avatar :       <Validator> function( elm:HTMLInputElement )   :boolean {
        if(!elm) return true
        return false
    },

}


function registrationFormValidateAll( e:Event ) {
    const elm = <HTMLInputElement> e.target;
    validatorsMap[`validate_${elm.name}`]( elm );
}


function submitValidate( e:Event ) {
    const form = <HTMLElement> e.currentTarget;
    const fields = form.querySelectorAll('input' );
    const errors = []
    fields.forEach( ( elm )=>{
        if( !validatorsMap[`validate_${elm.name}`]( elm ) ){
            errors.push( elm.name )
        }
    })

    if( errors.length > 0 ){
        e.preventDefault();
    }
}


function clearAllfields( e:Event ) {
    const field = <HTMLElement> e.target;
    field.classList.remove(noValidClass);
    const nxtSibling = <HTMLElement> field.nextElementSibling;
    nxtSibling.classList.remove(noValidClass);
    const innText :string|undefined = nxtSibling.dataset.label;
    nxtSibling.textContent = innText || '';
}


export { registrationFormValidateAll, clearAllfields, submitValidate }