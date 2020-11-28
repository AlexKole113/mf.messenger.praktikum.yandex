import ChatApi from "./class-ChatApi";

declare global {
    interface Window {
        APPTransport:any;
    }
}


export default class ChatRooms extends ChatApi {

    static _userSearch      = 'https://ya-praktikum.tech/api/v2/user/search';
    static _allChats        = 'https://ya-praktikum.tech/api/v2/chats';
    static _createChat      = 'https://ya-praktikum.tech/api/v2/chats';
    static _addUsertoChat   = 'https://ya-praktikum.tech/api/v2/chats/users'

    _users       = [{}];
    _chatRooms   = [{}];

    searchUsers( data:{} ) {
        return window.APPTransport.post( ChatRooms._userSearch , { data: JSON.stringify({ login: data } ) } )
        .then( ( response:ApiResponse ) => {
            if ( response.status !== 200 ) {
                return JSON.parse( response.response ).reason ;
            } else {
                let allUsers = JSON.parse( response.response );
                allUsers.forEach( ( user:{[key:string]:any} ) => {
                    for( let field in user ){
                        if( field === 'avatar' ){
                            user[field] =  ChatApi._baseDomain + user[field]
                        }
                    }
                })
                return allUsers;
            }
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }

    getAllChatRooms() {
        return window.APPTransport.get( ChatRooms._allChats )
        .then( ( response:ApiResponse ) => {
            return this._chatRooms = JSON.parse( response.response );
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }

    getUsersinChatRooms( roomID:string ){
        if(!roomID) return Promise.reject(false);
        return window.APPTransport.get(`https://ya-praktikum.tech/api/v2/chats/${roomID}/users`)
    }

    createSingleChatRoom( chatName:string ){
        return window.APPTransport.post( ChatRooms._createChat,{ data: JSON.stringify({ title: chatName } ) })
        .then( ( response:ApiResponse ) => {
            if( response.status !== 200 ){
              return false
            }
            return true;
        })
        .catch((e:Error)=>{
            console.log(e)
        })

    }

    addUserToChatRoom( userID:string|number, chatID:string|number ){
        return window.APPTransport.put( ChatRooms._addUsertoChat, { data: JSON.stringify({ users: [userID], chatId: chatID  } ) })
        .then( ( response:ApiResponse ) => {
            if( response.status !== 200 ){
                return false
            }
            return true;
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }

    removeUserFromChatRoom( userID:string|number, chatID:string|number ){
        return window.APPTransport.delete( ChatRooms._addUsertoChat, { data: JSON.stringify({ users: [userID], chatId: chatID  } ) })
        .then( ( response:ApiResponse ) => {
                if( response.status !== 200 ){
                    return false
                }
                return true;
            })
        .catch((e:Error)=>{
            console.log(e)
        })

    }

    getUserByID(id:string|number){
        return window.APPTransport.get(`https://ya-praktikum.tech/api/v2/user/${id}`)
        .then( ( response:ApiResponse ) => {
            return response.response;
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }

}