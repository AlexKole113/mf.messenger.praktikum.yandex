import { pageAuthorization } from "./static/pages/authorization/control/authorization-page.js";
import { pageChats } from "./static/pages/chats/control/chats.js";
import { pageChat } from "./static/pages/chat/control/сhat.js";
import { pageRegistration } from "./static/pages/registration/control/registration-page.js";
import { pageUserSettings } from "./static/pages/user-settings/control/user-settings-page.js";
import { pageError404 } from "./static/pages/404/control/error-page-404.js";
import { GLOBAL_EVENTS } from "./static/global/functions/hooks.js";
import Router from "./static/global/classes/class-Router.js";
let url = window.location.href.split('/');
let pathname = url[url.length - 1];
pathname = (!pathname) ? "/auth" : `/${pathname}`;
const router = new Router();
router
    .use("/auth", pageAuthorization)
    .use("/chats", pageChats)
    .use("/chat", pageChat)
    .use("/registration", pageRegistration)
    .use("/settings", pageUserSettings)
    .use("/error", pageError404)
    .start();
document.addEventListener('click', (e) => {
    //e.preventDefault()
    const target = e.target;
    if (typeof target.dataset.route !== 'undefined') {
        e.preventDefault();
        let path = target.dataset.route;
        router.go(path);
    }
});
GLOBAL_EVENTS.BUS.emit(GLOBAL_EVENTS.HOOKS.APP_START);
router.go(pathname);
//# sourceMappingURL=app.js.map