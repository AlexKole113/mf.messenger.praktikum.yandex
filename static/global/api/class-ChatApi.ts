
export default class ChatApi implements Api {


    static _baseDomain          = 'https://ya-praktikum.tech';

    static _authorizationURL    = ChatApi._baseDomain +'/api/v2/auth/signin';
    static _registrationURL     = ChatApi._baseDomain +'/api/v2/auth/signup';
    static _userDetailURL       = ChatApi._baseDomain +'/api/v2/auth/user';
    static _logout              = ChatApi._baseDomain +'/api/v2/auth/logout';

    static _changeUserDetails   = ChatApi._baseDomain +'/api/v2/user/profile';
    static _changeUserPassword  = ChatApi._baseDomain +'/api/v2/user/password';
    static _changeUserAvatar    = ChatApi._baseDomain +'/api/v2/user/profile/avatar';


    registration ( data:RegistrationData ){
        if(typeof data === "undefined") return;
        return window.APPTransport.post(ChatApi._registrationURL, { data:JSON.stringify( data ) } )
        .then( ( response:ApiResponse ) => {
            if ( response.status !== 200 ) {
                return JSON.parse( response.response ).reason ;
            } else {
                return true;
            }
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }

    authorization( data:AuthorizationData ) {
        if(typeof data === "undefined") return;

        return window.APPTransport.post(ChatApi._authorizationURL, { data: JSON.stringify( data ) } )
        .then( ( response:ApiResponse ) => {
            if ( response.status !== 200 ) {
               return JSON.parse( response.response ).reason ;
            } else {
               return true;
            }
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }

    getUserDetails(){
        return window.APPTransport.get(ChatApi._userDetailURL)
        .then( ( response:ApiResponse )=>{
            if( response.status !== 200 ){
                return false
            } else  {
                return JSON.parse( response.response );
            }
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }

    checkAuthorization() {
        return window.APPTransport.get(ChatApi._userDetailURL)
        .then( ( response:ApiResponse ) => {
                if( response.status !== 200 ){
                    return false
                } else  {
                    if( JSON.parse(response.response).id ) return true;
                }
            })
        .catch((e:Error)=>{
            console.log(e)
        })
    }

    updateUserDetails( data:{[key:string]:string}){
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
            allData.push( window.APPTransport.put(ChatApi._changeUserAvatar, { data: avatarData.avatar, headers: "Content-Type: multipart/form-data"  } ) );
        }

        if ( Object.keys( passwordData ).length !== 0) {
            allData.push( window.APPTransport.put(ChatApi._changeUserPassword, { data: JSON.stringify( passwordData ) } ) );
        }

        if ( Object.keys( otherData ).length !== 0) {
            allData.push( window.APPTransport.put(ChatApi._changeUserDetails, { data: JSON.stringify( otherData ) } ) );
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
        .catch((e:Error)=>{
           console.log(e)
        })
    }

    logout(){
        return window.APPTransport.post(ChatApi._logout)
        .then( ( response:ApiResponse ) => {
                if( response.status !== 200 ){
                    return false;
                } else  {
                    return true;
                }
            })
        .catch((e:Error)=>{
            console.log(e)
        })
    }


}