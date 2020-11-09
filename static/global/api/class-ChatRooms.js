import ChatApi from "./class-ChatApi.js";
export default class ChatRooms extends ChatApi {
    constructor() {
        super(...arguments);
        this._users = [{}];
        this._chatRooms = [{}];
    }
    searchUsers(data) {
        return window.APPTransport.post(ChatRooms._userSearch, { data: JSON.stringify({ login: data }) })
            .then((response) => {
            if (response.status !== 200) {
                return JSON.parse(response.response).reason;
            }
            else {
                let allUsers = JSON.parse(response.response);
                allUsers.forEach((user) => {
                    for (let field in user) {
                        if (field === 'avatar') {
                            user[field] = ChatApi._baseDomain + user[field];
                        }
                    }
                });
                return allUsers;
            }
        })
            .catch((e) => {
            console.log(e);
        });
    }
    getAllChatRooms() {
        return window.APPTransport.get(ChatRooms._allChats)
            .then((response) => {
            return this._chatRooms = JSON.parse(response.response);
        })
            .catch((e) => {
            console.log(e);
        });
    }
    getUsersinChatRooms(roomID) {
        if (!roomID)
            return Promise.reject(false);
        return window.APPTransport.get(`https://ya-praktikum.tech/api/v2/chats/${roomID}/users`);
    }
    createSingleChatRoom(chatName) {
        return window.APPTransport.post(ChatRooms._createChat, { data: JSON.stringify({ title: chatName }) })
            .then((response) => {
            if (response.status !== 200) {
                return false;
            }
            return true;
        })
            .catch((e) => {
            console.log(e);
        });
    }
    addUserToChatRoom(userID, chatID) {
        return window.APPTransport.put(ChatRooms._addUsertoChat, { data: JSON.stringify({ users: [userID], chatId: chatID }) })
            .then((response) => {
            if (response.status !== 200) {
                return false;
            }
            return true;
        })
            .catch((e) => {
            console.log(e);
        });
    }
    removeUserFromChatRoom(userID, chatID) {
        return window.APPTransport.delete(ChatRooms._addUsertoChat, { data: JSON.stringify({ users: [userID], chatId: chatID }) })
            .then((response) => {
            if (response.status !== 200) {
                return false;
            }
            return true;
        })
            .catch((e) => {
            console.log(e);
        });
    }
    getUserByID(id) {
        return window.APPTransport.get(`https://ya-praktikum.tech/api/v2/user/${id}`)
            .then((response) => {
            return response.response;
        })
            .catch((e) => {
            console.log(e);
        });
    }
}
ChatRooms._userSearch = 'https://ya-praktikum.tech/api/v2/user/search';
ChatRooms._allChats = 'https://ya-praktikum.tech/api/v2/chats';
ChatRooms._createChat = 'https://ya-praktikum.tech/api/v2/chats';
ChatRooms._addUsertoChat = 'https://ya-praktikum.tech/api/v2/chats/users';
//# sourceMappingURL=class-ChatRooms.js.map