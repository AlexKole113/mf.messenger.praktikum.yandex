import ChatList from "../../../components/chat-list/control/chat-list";
import Search from "../../../components/search/control/search";
import ChatAlert from "../../../components/chat-alert/control/chat-alert";
import Modal from "../../../components/modal/control/modal";


import Page from "../../../global/classes/class-Page.js";
import {chats} from "../view/chats.tmp.js";
import MenuChats from "../../../components/menu-chats/control/menu-chats.js";
import {chat_menus_starter, chatMenuLogOut} from "../../../global/functions/functions.js";
import {getAllChats,chatCreator} from "../../../global/functions/functions.js";


const AllChatsExample = [{
    avatar: '',
    id: '',
    title: '',
    excerpt: '',
    msg_amount: '',
}]

let chatList           = new ChatList('div#userList-component', AllChatsExample, 'current-user' );
let searchBlock        = new Search('div#searchBlock-component', { search_type:'search-chats' } );
let chatAlert          = new ChatAlert('div.chat-alert',{alert_msg:'Выберите чат'});
let modal              = new Modal('div#addchat.modal.bg_dark-gradient',{});
let chatMenu           = new MenuChats('div#chatMenu-component', {
    'handlers': [ { 'click' : chat_menus_starter }, { 'click' : chatMenuLogOut } ],
});


let pageChats = new Page( 'main.container', chats, {
    search_block : searchBlock,
    user_collection_block :  chatList ,
    chat_menu: chatMenu,
    chat_alert: chatAlert,
    modal: modal,
    handlers: [{'render': getAllChats.bind( chatList ) }, {'render': chatCreator.bind( chatList ) } ]
});

export {pageChats}








