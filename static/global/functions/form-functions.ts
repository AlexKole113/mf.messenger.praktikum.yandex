import ChatApi from "../api/class-ChatApi.js";


const MIN_STRING_LENGTH      = 1;
const MIN_PASSW_LENGTH       = 1;
const EMAIL_CHECKER          = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_CHECKER          = /[a-z]/;
const NO_VALID_CLASS         = 'no-valid';


const alerts              = {
    badName        : 'Без Имени сюда не пустят',
    badSurname     : 'Без Фамилии сюда не пустят',
    badlogin       : 'Без Логина сюда не пустят',
    badPhone       : 'Телефон не может содержать символы [a-z]',
    badEmail       : 'Введите корректный email',
    badPass        : `Пароль не может быть короче ${MIN_PASSW_LENGTH} символов`,
    NoMatchPass    : `Пароль не совпадает`,
    OldPassEmpty   : `Введите пароль`,
}
const backEndAlertsElement =  '.backend-alerts';


type Validator = ( T: HTMLInputElement ) => boolean|void;
type ValidatorsMap = Record<string, Validator>;
type Submiter = ( T: HTMLElement , B: object ) => void;
type SubmitersMap = Record<string, Submiter>;


const validatorsMap :ValidatorsMap = {

    validate_first_name :   <Validator> function ( elm:HTMLInputElement  )            :boolean {
        const field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(NO_VALID_CLASS)
            field.classList.add(NO_VALID_CLASS)
            return false
        }
        return true
    },

    validate_display_name:    <Validator> function( elm:HTMLInputElement )            :boolean {
        const field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(NO_VALID_CLASS)
            field.classList.add(NO_VALID_CLASS)
            return false
        }
        return true
    },

    validate_second_name :         <Validator> function ( elm:HTMLInputElement )      :boolean {
        const field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badName;
            nxtSibling.classList.add(NO_VALID_CLASS)
            field.classList.add(NO_VALID_CLASS)
            return false
        }
        return true
    },

    validate_login :               <Validator>  function( elm:HTMLInputElement )      :boolean {
        const field = elm;
        if( field.value.length < MIN_STRING_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling .innerText = alerts.badlogin;
            nxtSibling .classList.add(NO_VALID_CLASS)
            field.classList.add(NO_VALID_CLASS)
            return false
        }

        return true
    },

    validate_email :               <Validator> function( elm:HTMLInputElement )       :boolean {
        const field = elm;
        if( !EMAIL_CHECKER.test(field.value.toLowerCase()) ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badEmail;
            nxtSibling.classList.add(NO_VALID_CLASS)
            field.classList.add(NO_VALID_CLASS)
            return false
        }

        return true
    },

    validate_phone :               <Validator> function( elm:HTMLInputElement )       :boolean {
        const field = elm;
        if( PHONE_CHECKER.test(field.value.toLowerCase()) || field.value.length < 3 ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling .innerText = alerts.badPhone;
            nxtSibling .classList.add(NO_VALID_CLASS);
            field.classList.add(NO_VALID_CLASS);
            return false;
        }

        return true
    },

    validate_password :            <Validator> function( elm:HTMLInputElement )       :boolean {
        const field = elm;
        if( field.value.length < MIN_PASSW_LENGTH ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.badPass;
            nxtSibling.classList.add(NO_VALID_CLASS)
            field.classList.add(NO_VALID_CLASS)
            return false;
        }

        return true
    },

    validate_password_repeat :     <Validator> function( elm:HTMLInputElement )       :boolean {
        const field     = elm;
        const password  = <HTMLInputElement> document.querySelector('input[name="password"]');

        if( field.value !== password.value ){
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.NoMatchPass;
            nxtSibling.classList.add(NO_VALID_CLASS)
            field.classList.add(NO_VALID_CLASS)
            return false;
        }

        return true
    },

    validate_avatar :              <Validator> function( elm:HTMLInputElement )        {
        if( elm ) return true
    },

    validate_oldPassword:              <Validator> function( elm:HTMLInputElement )    {
        if( elm ) return true
    },

    validate_newPassword:              <Validator> function( elm:HTMLInputElement )   :boolean {
        const field        = elm;
        const passwordOld  = <HTMLInputElement> document.querySelector('input[name="oldPassword"]');

        if( field.value.length > 0 && passwordOld.value.length < 1 ) {
            let nxtSibling = <HTMLElement> passwordOld.nextElementSibling;
            nxtSibling.innerText = alerts.OldPassEmpty;
            nxtSibling.classList.add(NO_VALID_CLASS)
            passwordOld.classList.add(NO_VALID_CLASS)
            return false;
        } else if ( field.value.length < 1 && passwordOld.value.length > 0 ) {
            let nxtSibling = <HTMLElement> field.nextElementSibling;
            nxtSibling.innerText = alerts.OldPassEmpty;
            nxtSibling.classList.add(NO_VALID_CLASS)
            field.classList.add(NO_VALID_CLASS)
            return false;
        }

        return true
    },

}
const submitersMap  :SubmitersMap  = {

    authorization: <Submiter> function ( form:HTMLElement, dataFields:object ) :void {
        if(!form && !dataFields) return

       const auth :ApiResponse     = new ChatApi()
       auth.authorization( dataFields )
       .then( ( responseApi:string|boolean ) => {
            if ( responseApi !== true ) {
                if( document.querySelector( backEndAlertsElement ) ){
                    const elm = <HTMLElement> document.querySelector( backEndAlertsElement );
                    if(typeof responseApi !== 'undefined'){
                        elm.textContent = responseApi.toString();
                    }

                }
            } else {
                window.location.href = '/chats';
            }
        })
       .catch((e:Error)=>{
           console.log(e)
           if( document.querySelector( backEndAlertsElement ) ){
               const elm = <HTMLElement> document.querySelector( backEndAlertsElement );
               elm.textContent = e.message;
           }
       })
    },
    registration: <Submiter> function ( form:HTMLElement, dataFields:object )  :void {
        if(!form && !dataFields) return;

        if( typeof dataFields === 'undefined' ) return;
        const reg :ApiResponse     = new ChatApi();

        reg.registration( dataFields )
            .then( ( responseApi:boolean ) => {
                if ( responseApi !== true ) {
                    if( document.querySelector( backEndAlertsElement ) ){
                        const elm = <HTMLElement> document.querySelector( backEndAlertsElement );
                        elm.textContent = responseApi || '';
                    }
                } else {
                    window.location.href = '/chats';
                }
            })
            .catch((e:Error)=>{
                if( document.querySelector( backEndAlertsElement ) ){
                    const elm = <HTMLElement> document.querySelector( backEndAlertsElement );
                    elm.textContent = e.message;
                }
            })
    },
    userSettings: <Submiter> function ( form:HTMLElement, dataFields:{[avatar:string]:any} )  :void {
        if( !form && !dataFields) return;
        const upd  = new ChatApi()

        if( dataFields.avatar.length !== 0 ){
            const formData                          = new FormData();
            const fileElm :HTMLInputElement|null    = document.querySelector('input[name="avatar"]');
            if( fileElm && fileElm.files ){
                const file  = fileElm.files[0];
                formData.append('avatar', file  );
                dataFields.avatar = formData;
            }
        }


        upd.updateUserDetails( dataFields )
            .then( ( responseApi ) => {
                if ( responseApi !== true ) {
                    let textResponse =``;
                    if( Array.isArray( responseApi ) ){
                        responseApi.forEach( ( responseItem ) => {
                            textResponse += responseItem + ' ';
                        } )
                        if( document.querySelector( backEndAlertsElement ) ){
                            const elm = <HTMLElement> document.querySelector( backEndAlertsElement );
                            if( elm  ){
                                elm.textContent = textResponse;
                            }
                        }
                    } else {
                        if( document.querySelector( backEndAlertsElement ) ){
                            const elm = <HTMLElement> document.querySelector( backEndAlertsElement );
                            if( typeof responseApi !== 'undefined' ){
                                elm.textContent = responseApi;
                            }
                        }
                    }
                    setFieldsValue();
                } else {
                    setFieldsValue();
                }
            })
            .catch((e:Error)=>{
                if( document.querySelector( backEndAlertsElement ) ){
                    const elm = <HTMLElement> document.querySelector( backEndAlertsElement );
                    if( elm  ){
                        elm.textContent = e.message;
                    }
                }
            })

    },
}


function setFieldsValue() {
    const currentUser = new ChatApi();
    currentUser.getUserDetails()
    .then( ( userData:UserListProps ) => {
        for( let field in userData ){
            if(document.querySelector(`input[name=${field}]`)){

                if( field === 'avatar' &&  userData[field] ){
                    const elm = <HTMLElement> document.querySelector(`input[name=${field}]`);
                    if( elm.parentElement ){
                        elm.parentElement.style.backgroundImage = `url(https://ya-praktikum.tech/${userData[field]})`
                    }

                } else {
                    const elm = <HTMLInputElement> document.querySelector(`input[name=${field}]`);
                    if( elm && userData[field] ){
                        elm.value = (userData[field]).toString();
                    }

                }

            }


        }
    })

}

function registrationFormValidateAll( e:Event ) {
    const elm = <HTMLInputElement> e.target;
    validatorsMap[`validate_${elm.name}`]( elm );
}

function submitValidate( e:Event ) {
    e.preventDefault();
    const form                               = <HTMLElement> e.currentTarget;
    const formType                           = form.dataset.form_type;
    const fields                             = form.querySelectorAll('input' );
    const errors                             = [];
    const dataFields :{[key:string]:string}  = {};

    fields.forEach( ( elm :HTMLInputElement ) => {
        if( !validatorsMap[`validate_${elm.name}`]( elm ) ){
            errors.push( elm.name )
        } else {
            dataFields[ elm.name ] = elm.value;
        }
    })

    if( errors.length === 0 ){
        if( formType ){
            submitersMap[formType]( form, dataFields );
        } else {
            window.location.href = '/error';
        }
    }
}

function clearAllfields( e:Event ) {
    const field = <HTMLElement> e.target;
    field.classList.remove(NO_VALID_CLASS);
    const nxtSibling = <HTMLElement> field.nextElementSibling;
    if(nxtSibling){
        nxtSibling.classList.remove(NO_VALID_CLASS);
        const innText :string|undefined = nxtSibling.dataset.label;
        nxtSibling.textContent = innText || '';
    }
}



export { registrationFormValidateAll, clearAllfields, submitValidate, setFieldsValue }