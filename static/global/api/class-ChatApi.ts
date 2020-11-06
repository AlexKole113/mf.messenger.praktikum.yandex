import HTTPTransport from "../classes/class-HTTPTransport.js";


export default class ChatApi implements Api {


    static _baseDomain          = 'https://ya-praktikum.tech';

    static _authorizationURL    = 'https://ya-praktikum.tech/api/v2/auth/signin';
    static _registrationURL     = 'https://ya-praktikum.tech/api/v2/auth/signup';
    static _userDetailURL       = 'https://ya-praktikum.tech/api/v2/auth/user';
    static _logout              = 'https://ya-praktikum.tech/api/v2/auth/logout';

    static _changeUserDetails   = 'https://ya-praktikum.tech/api/v2/user/profile';
    static _changeUserPassword  = 'https://ya-praktikum.tech/api/v2/user/password';
    static _changeUserAvatar    = 'https://ya-praktikum.tech/api/v2/user/profile/avatar';


    registration ( data:object ){
        if(!data) return;
        const registrationTransport = new HTTPTransport( ChatApi._registrationURL );
        return registrationTransport.post( { data:JSON.stringify( data ) } )
        .then( ( response:ApiResponse ) => {
            if ( response.status !== 200 ) {
                return JSON.parse( response.response ).reason ;
            } else {
                return true;
            }
        })
    }

    authorization( data:object ) {
        if(!data) return;
        const authorizationTransport = new HTTPTransport( ChatApi._authorizationURL );
        return authorizationTransport.post( { data: JSON.stringify( data ) } )
        .then( ( response:ApiResponse ) => {
            if ( response.status !== 200 ) {
               return JSON.parse( response.response ).reason ;
            } else {
               return true;
            }
        })
    }

    getUserDetails(){
        const userDetails  = new HTTPTransport( ChatApi._userDetailURL );
        return userDetails.get()
            .then( ( response:ApiResponse )=>{
                if( response.status !== 200 ){
                    return false
                } else  {
                    return JSON.parse( response.response );
                }
            })
    }

    checkAuthorization() {
        const userChecker    = new HTTPTransport( ChatApi._userDetailURL );
        return userChecker.get()
            .then( ( response:ApiResponse ) => {
                if( response.status !== 200 ){
                    return false
                } else  {
                    if( JSON.parse(response.response).id ) return true;
                }
            })
    }

    updateUserDetails( data:{[key:string]:string}){
        const avatarDataUpdater     :HTTPSender                 = new HTTPTransport( ChatApi._changeUserAvatar );
        const passwordDataUpdater   :HTTPSender                 = new HTTPTransport( ChatApi._changeUserPassword );
        const otherDataUpdater      :HTTPSender                 = new HTTPTransport( ChatApi._changeUserDetails );
        const avatarData            :{[key:string]:string}      = {};
        const passwordData          :{[key:string]:string}      = {};
        const otherData             :{[key:string]:string}      = {};
        const allData                                           = [];

        for( let fieldName in data ){
            if( fieldName === 'avatar' ){
                avatarData[fieldName] = data[fieldName]
            } else if ( fieldName === 'newPassword' || fieldName === 'oldPassword' ){
                passwordData[fieldName] = data[fieldName]
            } else {
                otherData[fieldName] = data[fieldName]
            }
        }


        if ( Object.keys( avatarData ).length !== 0) {
            allData.push( avatarDataUpdater.put( { data: avatarData.avatar, headers: "Content-Type: multipart/form-data"  } ) );
        }

        if ( Object.keys( passwordData ).length !== 0) {
            allData.push( passwordDataUpdater.put( { data: JSON.stringify( passwordData ) } ) );
        }

        if ( Object.keys( otherData ).length !== 0) {
            allData.push( otherDataUpdater.put( { data: JSON.stringify( otherData ) } ) );
        }

        // @ts-ignore
       return Promise.allSettled( allData )
        .then( ( response:ApiResponse ) => {
            let errors :string[] = [];

            response.forEach( ( response:ApiResponse ) => {
                if( response.value.status !== 200 ){
                    errors.push(response.value.response )
                }
            })

            if(errors.length === 0){
                return true
            } else {
                return errors;
            }

        })

    }

    logout(){
        const exit    = new HTTPTransport( ChatApi._logout );
        return exit.post()
            .then( ( response:ApiResponse ) => {
                if( response.status !== 200 ){
                    return false;
                } else  {
                    return true;
                }
            })
    }


}