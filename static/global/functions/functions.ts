// @ts-nocheck
import ChatApi from "../api/class-ChatApi";
import ChatRooms from "../api/class-ChatRooms";
import RemoveFromChat from "../../components/remove-from-chat/control/remove-from-chat";
import AddToChat from "../../components/add-to-chat/control/add-to-chat";

function urlQueryGetHelper() {
    let allGet =  window.location.href.split('?chatid=');
    allGet     = allGet[allGet.length-1];

    if( allGet.indexOf('&') !== -1 ){
        allGet = allGet.split('#')[0];
    }

    if( allGet.indexOf('#') !== -1 ){
        allGet = allGet.split('#')[0];
    }

    return allGet
}

function allModalCloser() {
    document.querySelector('.mobile-wrapper').classList.remove("active");
    document.querySelector('.user-list').classList.remove("open");
    document.querySelector('.chat-top__items-menu').classList.remove("open");
    document.querySelector('.modal').classList.remove("open");
    if( document.querySelector('.chat-bottom__items-menu') ){
        document.querySelector('.chat-bottom__items-menu').classList.remove("open");
    }
    document.querySelectorAll(".z-25").forEach((elm) => {
        elm.classList.remove("z-25");
    });
}

function chat_menus_starter() {
    document.querySelector('.chat-top__items-menu-starter').classList.toggle("z-25");
    document.querySelector('.chat-top__items-menu').classList.toggle("open");
    document.querySelector('.mobile-wrapper').classList.toggle("active");
}

function attach_menu_starter( e ) {
    if (e.target.classList.contains('attach-menu-starter')) {
        document.querySelector('.chat-bottom__items-add-attach').classList.toggle("z-25");
        document.querySelector('.chat-bottom__items-menu').classList.toggle("open");
        document.querySelector('.mobile-wrapper').classList.toggle("active");
    }
}

function chatMenuLogOut() {
    document.addEventListener('click', (e:Event) => {
        if( e.target.classList.contains('logout-link') ){
            const exit = new ChatApi();
            exit.logout()
                .then( ( response ) => {
                    if( response === true ){
                        console.log('Succes')
                    }
                })
        }
    })
}

function usersSearch() {
    const userList = this;
    document.addEventListener('input', (e) => {
        if( e.target.name === 'search-users' ){
            const chatRoom = new ChatRooms();
            if( e.target.value.length > 0 ){
                chatRoom.searchUsers( e.target.value , userList, urlQueryGetHelper() )
                .then( ( allUsers ) => {
                    return chatRoom.getUsersinChatRooms( urlQueryGetHelper() )
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

                        userList.setProps( allUsers );
                    })

                    })
            } else {
                const roomID = urlQueryGetHelper();
                chatRoom.getUsersinChatRooms( roomID )
                .then( ( response )=>{
                    userList.setProps(response)
                } )
            }
        }
    })
}

function addremoveToSingleChat() {
    document.addEventListener('click', (e) => {
        e.preventDefault();

        if( e.target.hasAttribute('data-chat_include') ||
            e.target.parentElement.hasAttribute('data-chat_include') ){

            const link   = ( e.target.hasAttribute('data-chat_include') ) ? e.target : e.target.parentElement;
            const action = link.dataset.chat_include;
            const userID = link.dataset.user_id;
            const chatID = urlQueryGetHelper();

            if( action === 'add' ){
                const userAddRequest = new ChatRooms();
                userAddRequest.addUserToChatRoom( userID,chatID )
                .then( ( resp ) => {
                    if( resp === true ){
                        link.setAttribute('data-chat_include','remove');
                        link.innerHTML = `<i class="fas fa-user-minus" aria-hidden="true"></i>`
                    }
                })
            } else if( action === 'remove' ){
                const userRemoveRequest = new ChatRooms();
                userRemoveRequest.removeUserFromChatRoom( userID, chatID )
                .then( ( resp ) => {
                    if( resp === true ){
                        link.setAttribute('data-chat_include','add');
                        link.innerHTML = `<i class="fas fa-user-plus" aria-hidden="true"></i>`
                    }
                })
            }

        }
    })
}

function showUsers() {
    const userList = this;
    const chatRoom = new ChatRooms();
    const roomID = urlQueryGetHelper();
    chatRoom.getUsersinChatRooms( roomID )
    .then( ( response ) => {

            let allUsersResponse = JSON.parse( response.response );
            allUsersResponse.forEach(( user )=>{
                user.avatar = ChatApi._baseDomain + user.avatar;
                user.add_remove_chat = new RemoveFromChat('span.remove-from-chat',{user_id:user.id, user_login: user.login }).getElement();
            })

            const clearUsers = [allUsersResponse[0]]
            for(let i = 0; i < allUsersResponse.length; i++){
                let coincidence = false;

                for(let j = 0; j < clearUsers.length; j++){
                    if(allUsersResponse[i].id === clearUsers[j].id ) {
                        coincidence = true;
                        break;
                    }
                }

                if( coincidence === false ) clearUsers.push(allUsersResponse[i]);

            }

            return clearUsers;
        } )

    .then( ( response )=>{
        userList.setProps(response)
    } )
    .catch(()=>{
       console.log(e)
    })
}

function getAllChats() {
    const chatList = this;
    const allChatsRequest = new ChatRooms();
    allChatsRequest.getAllChatRooms()
    .then( ( response ) => {
        chatList.setProps(response)
    })
}

function chatCreator () {
    const chatList = this;
    document.addEventListener('click', (e) => {
        if( e.target.dataset.action === 'chat-creator' ){
            e.preventDefault();
            const chatName = document.querySelector('input[data-action="chat-name"]').value;
            if( chatName && chatName.length > 0){
                document.querySelector('input[data-action="chat-name"]').value = '';
                const chatCreateRequest = new ChatRooms();
                chatCreateRequest.createSingleChatRoom( chatName )
                .then( ( response ) => {
                    if(response === true){
                      const update = getAllChats.bind(chatList);
                      update();
                      allModalCloser()
                    }

                })

            }
        }
    })
}




export { attach_menu_starter, chat_menus_starter, chatMenuLogOut, usersSearch, addremoveToSingleChat, showUsers, getAllChats, chatCreator };
//# sourceMappingURL=functions.js.map