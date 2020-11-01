import UserList from "../../../components/user/control/user.js";
import Search from "../../../components/search/control/search.js";
import ChatAlert from "../../../components/chat-alert/control/chat-alert.js";


import Page from "../../../global/classes/class-Page.js";
import {usersPage} from "../view/users-page.tmp.js";


let usersCollection = [
    {
        photo: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg',
        userprofile: '/chat',
        name: 'Андрей',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        last_msg_link: '/chat',
        // msg_amount: 0,
        time: '10:00',
        active: true,
    },
    {
        photo: 'https://cdn.pixabay.com/photo/2016/01/19/14/53/camera-1149041_1280.jpg',
        userprofile: '/chat',
        name: 'Киноклуб',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        last_msg_link: '/chat',
        msg_amount: 8,
        time: '09:00',
        active: false,
    },
    {
        photo: 'https://cdn.pixabay.com/photo/2016/06/14/10/42/scarecrow-1456235_1280.png',
        userprofile: '/chat',
        name: 'Design Destroyer',
        excerpt: 'Lorem ipsum dolor',
        last_msg_link: '/chat',
        // msg_amount: 0,
        time: '09:15',
        active: false,
    },
    {
        photo: 'https://cdn.pixabay.com/photo/2017/05/11/08/48/model-2303361_1280.jpg',
        userprofile: '/chat',
        name: 'Лена',
        excerpt: 'Привет',
        last_msg_link: '/chat',
        // msg_amount: 0,
        time: '08:30',
        active: false,
    },
    {
        photo: '#',
        userprofile: '/chat',
        name: 'Mr.No Аватар',
        excerpt: 'Привет',
        last_msg_link: '/chat',
        msg_amount: 2,
        time: '07:00',
        active: false,

    },
    {
        photo: 'https://cdn.pixabay.com/photo/2015/11/06/11/32/girl-1026246_1280.jpg',
        userprofile: '/chat',
        name: 'Маша',
        excerpt: 'Привет',
        last_msg_link: '/chat',
        // msg_amount: 0,
        time: '12:00',
        active: false,

    },
    {
        photo: 'https://cdn.pixabay.com/photo/2019/06/02/17/33/woman-4246954_1280.jpg',
        userprofile: '/chat',
        name: 'User',
        excerpt: 'Привет',
        last_msg_link: '/chat',
        msg_amount: 4,
        time: '12:00',
        active: false,

    }
];

let userList          = new UserList('div#userList-component', usersCollection, 'current-user' );
let searchBlock       = new Search('div#searchBlock-component', {} );
let chatAlert         = new ChatAlert('div.chat-alert',{alert_msg:'Собщений нет('})



let pageUsers = new Page( 'main.container', usersPage, {
    search_block : searchBlock,
    user_collection_block :  userList,
    chat_alert: chatAlert,
});

export {pageUsers}








