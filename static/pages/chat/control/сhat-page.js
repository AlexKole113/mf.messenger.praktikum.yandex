import UserList from "../../../components/user/control/user.js";
import Search from "../../../components/search/control/search.js";
import AttachMenu from "../../../components/attach-menu/control/attach-menu.js";
import SendMessage from "../../../components/send-message/control/send-message.js";
import SendMessageGroup from "../../../components/send-message-group/control/send-message-group.js";
import ChatDetails from "../../../components/chat-details/control/chat-details.js";
import ChatMenu from "../../../components/chat-menu/control/chat-menu.js";
import Message from "../../../components/message/control/message.js";
import Page from "../../../global/classes/class-Page.js";
import { chatPage } from "../view/chat-page.tmp.js";
import { attach_menu_starter } from "../../../global/functions/menu-functions.js";
let usersCollection = [
    {
        photo: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg',
        userprofile: '#',
        name: 'Андрей',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        last_msg_link: '#',
        msg_amount: 0,
        time: '10:00',
        active: true,
    },
    {
        photo: 'https://cdn.pixabay.com/photo/2016/01/19/14/53/camera-1149041_1280.jpg',
        userprofile: '#',
        name: 'Киноклуб',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        last_msg_link: '#',
        msg_amount: 8,
        time: '09:00',
        active: false,
    },
    {
        photo: 'https://cdn.pixabay.com/photo/2016/06/14/10/42/scarecrow-1456235_1280.png',
        userprofile: '#',
        name: 'Design Destroyer',
        excerpt: 'Lorem ipsum dolor',
        last_msg_link: '#',
        msg_amount: 0,
        time: '09:15',
        active: false,
    },
    {
        photo: 'https://cdn.pixabay.com/photo/2017/05/11/08/48/model-2303361_1280.jpg',
        userprofile: '#',
        name: 'Лена',
        excerpt: 'Привет',
        last_msg_link: '#',
        msg_amount: 0,
        time: '08:30',
        active: false,
    },
    {
        photo: '#',
        userprofile: '#',
        name: 'Mr.No Аватар',
        excerpt: 'Привет',
        last_msg_link: '#',
        msg_amount: 2,
        time: '07:00',
        active: false,
    },
    {
        photo: 'https://cdn.pixabay.com/photo/2015/11/06/11/32/girl-1026246_1280.jpg',
        userprofile: '#',
        name: 'Маша',
        excerpt: 'Привет',
        last_msg_link: '#',
        msg_amount: 0,
        time: '12:00',
        active: false,
    },
    {
        photo: 'https://cdn.pixabay.com/photo/2019/06/02/17/33/woman-4246954_1280.jpg',
        userprofile: '#',
        name: 'User',
        excerpt: 'Привет',
        last_msg_link: '#',
        msg_amount: 4,
        time: '12:00',
        active: false,
    }
];
let messageFeed = [
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
let activeChat = {
    name: 'Андрей',
    lastTime: 'Был 1 минуту назад',
    photo: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg',
    link: '#'
};
let userList = new UserList('div#userList-component', usersCollection, 'current-user');
let messageList = new Message('div#messagelist-component', messageFeed);
let searchBlock = new Search('div#searchBlock-component', '');
let sendMessageGroup = new SendMessageGroup('div#sendMessageGroup-component', {
    send_message: new SendMessage('div#sendMessage-component', '').getElement(),
    attach_menu: new AttachMenu('div#attachMenu-component', '').getElement(),
    handlers: [{ 'click': attach_menu_starter }],
});
let chatDetails = new ChatDetails('div#chatDetails-component', activeChat);
let chatMenu = new ChatMenu('div#chatMenu-component', {
    handlers: { 'click': attach_menu_starter }
});
let page = new Page('main.container', chatPage, {
    search_block: searchBlock,
    user_collection_block: userList,
    send_message_group: sendMessageGroup,
    chat_deatails: chatDetails,
    chat_menu: chatMenu,
    messages: messageList,
});
page.render();
// --------------------------------------------- setProps() test ---------------------------------------------------
usersCollection[0].active = false;
usersCollection.unshift({
    photo: 'https://cs4.pikabu.ru/images/big_size_comm/2014-09_4/14111041328769.jpg',
    userprofile: '#',
    name: 'Черный Властелин',
    excerpt: 'Вот ты и попался пупсик',
    last_msg_link: '#',
    msg_amount: 0,
    time: '12:00',
    active: true,
});
let newMsg = [{
        content: 'Привет',
        time: '10:00',
        user: 0,
    }];
//1
setTimeout(() => {
    userList.setProps(usersCollection);
    chatDetails.setProps({
        name: 'Черный Властелин',
        lastTime: 'в сети',
        photo: 'https://cs4.pikabu.ru/images/big_size_comm/2014-09_4/14111041328769.jpg',
        link: '#'
    });
    messageList.setProps(newMsg);
}, 2000);
//2
setTimeout(() => {
    newMsg.push({
        content: 'Я давно слежу за тобой...',
        time: '10:00',
        user: 0,
    });
    messageList.setProps(newMsg);
}, 3000);
//3
setTimeout(() => {
    newMsg.push({
        content: 'Вот ты и попался, пупсик',
        time: '10:00',
        user: 0,
    });
    messageList.setProps(newMsg);
}, 4000);
//# sourceMappingURL=сhat-page.js.map