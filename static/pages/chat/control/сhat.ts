import UserList from "../../../components/user/control/user.js";
import Search from "../../../components/search/control/search.js";
import AttachMenu from "../../../components/attach-menu/control/attach-menu.js";
import SendMessage from "../../../components/send-message/control/send-message.js";
import SendMessageGroup from "../../../components/send-message-group/control/send-message-group.js";
import ChatDetails from "../../../components/chat-details/control/chat-details.js";
import MenuChat from "../../../components/menu-chat/control/menu-chat.js";
import Message from "../../../components/message/control/message.js";


import Page from "../../../global/classes/class-Page.js";
import {chatPage} from "../view/chat-page.tmp.js";

import {attach_menu_starter, chat_menus_starter, chatMenuLogOut, usersSearch, addremoveToSingleChat, showUsers } from "../../../global/functions/menu-functions.js";

const usersCollection = [{avatar:'', login:'', active:''}];
const messageFeed     = [
    {
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem cumque cupiditate earum eos et facere, maiores necessitatibus nulla odit officiis placeat porro, quibusdam reprehenderit sunt tempore voluptatem. Consectetur, pariatur!',
        time: '10:00',
        user: 0,
    },
    {
        content: 'Text text text',
        time: '11:00',
        user: 0,
    },
    {
        content: 'lorem xsx',
        time: '13:00',
        user: 1,
        delivered: true
    }
];
const activeChat      = {
    name: 'Андрей',
    lastTime: 'Был 1 минуту назад',
    photo: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg',
    link: '#',
};



let userList          = new UserList('div#userList-component', usersCollection, 'current-user' );
let messageList       = new Message('div#messagelist-component', messageFeed );
let searchBlock       = new Search('div#searchBlock-component', { search_type:'search-users' } );
let sendMessageGroup  = new SendMessageGroup('div#sendMessageGroup-component',{
    send_message: new SendMessage('div#sendMessage-component', {} ).getElement(),
    attach_menu:  new AttachMenu('div#attachMenu-component', {} ).getElement(),
    handlers: [ { 'click' : attach_menu_starter } ],
});


let chatDetails        = new ChatDetails('div#chatDetails-component', activeChat )
let chatMenu           = new MenuChat('div#chatMenu-component', {
    'handlers': [ { 'click' : chat_menus_starter }, { 'click' : chatMenuLogOut } ],
});


let pageChat = new Page( 'main.container', chatPage, {
    search_block : searchBlock,
    user_collection_block :  userList,
    send_message_group : sendMessageGroup,
    chat_deatails: chatDetails,
    chat_menu: chatMenu,
    messages: messageList,
    handlers: [ {'render': usersSearch.bind( userList ) }, {'render': showUsers.bind( userList ) }, {'render': chatMenuLogOut }, {'render': addremoveToSingleChat } ]
});

export {pageChat}
