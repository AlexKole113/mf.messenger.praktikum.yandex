const MIN_STRING_LENGTH  = 2;
const MIN_PASSW_LENGTH   = 8;
const noValidClass       = 'no-valid';
const alerts             = {
    badName    : 'Без Имени сюда не пустят',
    badSurname : 'Без Фамилии сюда не пустят',
    badlogin   : 'Без Логина сюда не пустят',
    badPhone   : 'Телефон не может содержать символы [a-z]',
    badEmail   : 'Введите корректный email',
    badPass    : `Пароль должен быть длиннее ${MIN_PASSW_LENGTH} символов`,
}


const validateFunctions :{[key:string]:CallableFunction} = {
    validate_first_name : function ( elm:HTMLInputElement  ) :boolean {
        let field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }
        return true
    },
    validate_second_name : function ( elm:HTMLInputElement ) :boolean {
        return this.validate_first_name( elm )
    },
    validate_login : function( elm:HTMLInputElement ) :boolean {
        let field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling .innerText = alerts.badlogin;
            nxtSibling .classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }

        return true
    },
    validate_email : function( elm:HTMLInputElement ) :boolean {
        let field = elm;
        let re =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if( !re.test(field.value.toLowerCase()) ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badEmail;
            nxtSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false
        }

        return true
    },
    validate_phone : function( elm:HTMLInputElement ) :boolean {
        let field = elm;
        let re =  /[a-z]/;
        if( re.test(field.value.toLowerCase()) || field.value.length < 3 ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling .innerText = alerts.badPhone;
            nxtSibling .classList.add(noValidClass);
            field.classList.add(noValidClass);
            return false;
        }

        return true
    },
    validate_password : function( elm:HTMLInputElement ) :boolean {
        let field = elm;
        if( field.value.length < MIN_PASSW_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badPass;
            nxtSibling.classList.add(noValidClass)
            field.classList.add(noValidClass)
            return false;
        }

        return true
    },
    validate_avatar : function( elm:HTMLInputElement ) {
        let field = elm;
        if(field){
            return true
        }

    },
}


function registrationFormValidateAll( e:Event ) {
    let elm = <HTMLInputElement> e.target;
    validateFunctions[`validate_${elm.name}`]( e.target );
}


function submitValidate( e:Event ) {
    let form = <HTMLElement> e.currentTarget;
    let fields = form.querySelectorAll('input' );
    let errors = []
    fields.forEach( ( elm )=>{
        if( !validateFunctions[`validate_${elm.name}`]( elm ) ){
            errors.push( elm.name )
        }
    })

    if( errors.length > 0 ){
        e.preventDefault();
    }
}


function clearAllfields( e:Event ) {
    let field = <HTMLElement> e.target;
    field.classList.remove(noValidClass);
    let nxtSibling = <HTMLElement> field.nextElementSibling;
    nxtSibling.classList.remove(noValidClass);
    let innText :any = nxtSibling.dataset.label;
    nxtSibling.innerText = innText;
}


export { registrationFormValidateAll, clearAllfields, submitValidate }