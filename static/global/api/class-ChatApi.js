export default class ChatApi {
    registration(data) {
        if (typeof data === "undefined")
            return;
        return window.APPTransport.post(ChatApi._registrationURL, { data: JSON.stringify(data) })
            .then((response) => {
            if (response.status !== 200) {
                return JSON.parse(response.response).reason;
            }
            else {
                return true;
            }
        });
    }
    authorization(data) {
        if (typeof data === "undefined")
            return;
        return window.APPTransport.post(ChatApi._authorizationURL, { data: JSON.stringify(data) })
            .then((response) => {
            if (response.status !== 200) {
                return JSON.parse(response.response).reason;
            }
            else {
                return true;
            }
        });
    }
    getUserDetails() {
        return window.APPTransport.get(ChatApi._userDetailURL)
            .then((response) => {
            if (response.status !== 200) {
                return false;
            }
            else {
                return JSON.parse(response.response);
            }
        })
            .catch((e) => {
            console.log(e);
        });
    }
    checkAuthorization() {
        return window.APPTransport.get(ChatApi._userDetailURL)
            .then((response) => {
            if (response.status !== 200) {
                return false;
            }
            else {
                if (JSON.parse(response.response).id)
                    return true;
            }
        })
            .catch((e) => {
            console.log(e);
        });
    }
    updateUserDetails(data) {
        const avatarData = {};
        const passwordData = {};
        const otherData = {};
        const allData = [];
        for (let fieldName in data) {
            if (fieldName === 'avatar') {
                avatarData[fieldName] = data[fieldName];
            }
            else if (fieldName === 'newPassword' || fieldName === 'oldPassword') {
                passwordData[fieldName] = data[fieldName];
            }
            else {
                otherData[fieldName] = data[fieldName];
            }
        }
        if (Object.keys(avatarData).length !== 0) {
            allData.push(window.APPTransport.put(ChatApi._changeUserAvatar, { data: avatarData.avatar, headers: "Content-Type: multipart/form-data" }));
        }
        if (Object.keys(passwordData).length !== 0) {
            allData.push(window.APPTransport.put(ChatApi._changeUserPassword, { data: JSON.stringify(passwordData) }));
        }
        if (Object.keys(otherData).length !== 0) {
            allData.push(window.APPTransport.put(ChatApi._changeUserDetails, { data: JSON.stringify(otherData) }));
        }
        return Promise.allSettled(allData)
            .then((response) => {
            let errors = [];
            response.forEach((response) => {
                if (response.value.status !== 200) {
                    errors.push(response.value.response);
                }
            });
            if (errors.length === 0) {
                return true;
            }
            else {
                return errors;
            }
        });
    }
    logout() {
        return window.APPTransport.post(ChatApi._logout)
            .then((response) => {
            if (response.status !== 200) {
                return false;
            }
            else {
                return true;
            }
        })
            .catch((e) => {
            console.log(e);
        });
    }
}
ChatApi._baseDomain = 'https://ya-praktikum.tech';
ChatApi._authorizationURL = ChatApi._baseDomain + '/api/v2/auth/signin';
ChatApi._registrationURL = ChatApi._baseDomain + '/api/v2/auth/signup';
ChatApi._userDetailURL = ChatApi._baseDomain + '/api/v2/auth/user';
ChatApi._logout = ChatApi._baseDomain + '/api/v2/auth/logout';
ChatApi._changeUserDetails = ChatApi._baseDomain + '/api/v2/user/profile';
ChatApi._changeUserPassword = ChatApi._baseDomain + '/api/v2/user/password';
ChatApi._changeUserAvatar = ChatApi._baseDomain + '/api/v2/user/profile/avatar';
//# sourceMappingURL=class-ChatApi.js.map