import ChatApi from "./class-ChatApi.js";
import HTTPTransport from "../classes/class-HTTPTransport.js";
import RemoveFromChat from "../../components/remove-from-chat/control/remove-from-chat.js";
import AddToChat from "../../components/add-to-chat/control/add-to-chat.js";

export default class ChatRooms extends ChatApi {

    static _userSearch      = 'https://ya-praktikum.tech/api/v2/user/search';
    static _allChats        = 'https://ya-praktikum.tech/api/v2/chats';
    static _createChat      = 'https://ya-praktikum.tech/api/v2/chats';
    static _addUsertoChat   = 'https://ya-praktikum.tech/api/v2/chats/users'

    _users      :object[];
    _chatRooms  :object[];

    _userListUpdater( elm ){
        elm.setProps( this._users );
    }

    searchUsers( data , elm , roomID ) {
        const searchUsersTransport = new HTTPTransport( ChatRooms._userSearch );
        return searchUsersTransport.post( { data: JSON.stringify({ login: data } ) } )
        .then( ( response ) => {
            if ( response.status !== 200 ) {
                return JSON.parse( response.response ).reason ;
            } else {
                let allUsers = JSON.parse( response.response );
                allUsers.forEach( ( user ) => {
                    for( let field in user ){
                        if( field === 'avatar' ){
                            user[field] =  ChatApi._baseDomain + user[field]
                        }
                    }
                })
                return allUsers;
            }
        })
        .then( ( allUsers ) => {
           return this.getUsersinChatRooms( roomID )
           .then( ( usersInRooms ) => {

                    for( let i = 0; i < allUsers.length; i++ ){
                        for( let j = 0; j < usersInRooms.length; j++ ){
                            if( allUsers[i].id === usersInRooms[j].id ){
                                allUsers[i].add_remove_chat = new RemoveFromChat('span.remove-from-chat',{user_id:allUsers[i].id, user_login: allUsers[i].login }).getElement();
                            }
                        }

                        if(!allUsers[i].add_remove_chat){
                            allUsers[i].add_remove_chat = new AddToChat('span.add-to-chat',{user_id:allUsers[i].id, user_login: allUsers[i].login}).getElement()
                        }
                    }
                    this._users = allUsers;
                    this._userListUpdater(elm)
                } )

        })
    }

    getAllChatRooms() {
        const allChatsRequest = new HTTPTransport( ChatRooms._allChats );
        return allChatsRequest.get()
        .then( ( response ) => {
            return this._chatRooms = JSON.parse( response.response );
        })
    }

    getUsersinChatRooms( roomID ){
        if(!roomID) return;
        const requestURL = `https://ya-praktikum.tech/api/v2/chats/${roomID}/users`;
        const requestUsers =  new HTTPTransport( requestURL );
        return requestUsers.get()
        .then( ( response ) => {

            let allUsersResponse = JSON.parse( response.response );
            allUsersResponse.forEach(( user )=>{
                user.avatar = ChatApi._baseDomain + user.avatar;
                user.add_remove_chat = new RemoveFromChat('span.remove-from-chat',{user_id:user.id, user_login: user.login }).getElement();
            })

            const clearUsers = [];
            for(let i = 0; i < allUsersResponse.length; i++){
                let   counter    = 0;
                for(let j = 0; j < allUsersResponse.length; j++){
                   if( allUsersResponse[j].id === allUsersResponse[i].id ) counter+=1;
                }
                if(counter < 2 ) clearUsers.push( allUsersResponse[i] ) ;
            }

            console.log(allUsersResponse)
            //return allUsersResponse;
            return clearUsers;
        } )
    }

    createSingleChatRoom( chatName ){
        const chatCreateRequest = new HTTPTransport( ChatRooms._createChat );
        return chatCreateRequest.post({ data: JSON.stringify({ title: chatName } ) })
        .then( ( response ) => {
            if( response.status !== 200 ){
              return false
            }
            return true;
        })

    }

    addUserToChatRoom( userID, chatID ){
        const addUserRequest = new HTTPTransport( ChatRooms._addUsertoChat );
        return addUserRequest.put({ data: JSON.stringify({ users: [userID], chatId: chatID  } ) })
        .then( ( response ) => {
            if( response.status !== 200 ){
                return false
            }
            return true;
        })
    }

    removeUserFromChatRoom( userID, chatID ){
        const removeUserRequest = new HTTPTransport( ChatRooms._addUsertoChat );
        return removeUserRequest.delete({ data: JSON.stringify({ users: [userID], chatId: chatID  } ) })
            .then( ( response ) => {
                if( response.status !== 200 ){
                    return false
                }
                return true;
            })
    }


    getUserByID(id){
        const requestURL = `https://ya-praktikum.tech/api/v2/user/${id}`;
        const requestUser =  new HTTPTransport( requestURL );
        return requestUser.get()
        .then( ( response ) => {
            return response.response;
        })
    }


}