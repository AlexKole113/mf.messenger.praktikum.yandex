//import User from "../classes/class-User.js";

export { registrationFormValidateAll, clearAllfields, submitValidate }

let minStrLength  = 2;
let minPassLength = 3000;
let noValidClass  = 'no-valid';
let alerts = {
    badName    : 'Без Имени сюда не пустят',
    badSurname : 'Без Фамилии сюда не пустят',
    badlogin   : 'Без Логина сюда не пустят',
    badPhone   : 'Телефон нужен вменяемый',
    badEmail   : 'Email нужен вменяемый',
    badPass    : `Пароль должен быть длиннее ${minPassLength}`,
}



function registrationFormValidateAll( e ) {
    validateFunctions[`validate_${e.target.name}`]( e.target );
}

function submitValidate( e ) {
    let fields = this.querySelectorAll('input' );
    let errors = []

    fields.forEach((elm)=>{
        if(!validateFunctions[`validate_${elm.name}`]( elm )){
            errors.push(1)
        }
    })

    if( errors.length > 0 ){
        e.preventDefault();
    }
}


let validateFunctions = {
    validate_first_name : function ( elm  ) {
        let field = elm;
        if( field.value.length < minStrLength ){
            field.nextElementSibling.innerText = alerts.badName;
            field.nextElementSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }
        return true
    },
    validate_second_name : function ( elm  ) {
        return this.validate_first_name( elm )
    },
    validate_login : function( elm ) {
        let field = elm;
        if( field.value.length < minStrLength ){
            field.nextElementSibling.innerText = alerts.badlogin;
            field.nextElementSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }

        return true
    },
    validate_email : function( elm ) {
        let field = elm;
        let re =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if( !re.test(field.value.toLowerCase()) ){
            field.nextElementSibling.innerText = alerts.badEmail;
            field.nextElementSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }

        return true
    },
    validate_phone : function( elm ) {
        let field = elm;
        let re =  /[a-z]/;
        if( re.test(field.value.toLowerCase()) || field.value.length < 3 ){
            field.nextElementSibling.innerText = alerts.badPhone;
            field.nextElementSibling.classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }

        return true
    },
    validate_password : function( elm ) {
        let field = elm;
        if( field.value.length < minPassLength ){
            field.nextElementSibling.innerText = alerts.badPass;
            field.nextElementSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false;
        }

        return true
    },
    validate_avatar : function( elm ) {
        return true
    },
}













function clearAllfields(e) {
    let field = e.target;
    field.classList.remove(noValidClass);
    field.nextElementSibling.classList.remove(noValidClass);
    field.nextElementSibling.innerText = field.nextElementSibling.dataset.label
}






// function form_handlers(){
//
//     const inputs     =  document.querySelectorAll('form input' );
//     const btn_submit =  document.querySelector('button[type="submit"]');
//
//     btn_submit.addEventListener( 'click', ( e ) => {
//         e.preventDefault();
//         let data = {};
//
//         inputs.forEach( ( itm )=>{
//             if( itm.value.length > 0){
//                 data[ itm.getAttribute('name') ] = itm.value;
//             }
//         });
//
//         if ( Object.keys( data ).length > 0 ) {
//             let user = new User;
//             user.setData( data ).getData();
//         }
//
//     } );
// }