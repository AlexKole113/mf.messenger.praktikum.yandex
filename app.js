import { pageAuthorization } from "./static/pages/authorization/control/authorization-page.js";
import { pageUsers } from "./static/pages/users/control/users-page.js";
import { pageChat } from "./static/pages/chat/control/сhat-page.js";
import { pageRegistration } from "./static/pages/registration/control/registration-page.js";
import { pageUserSettings } from "./static/pages/user-settings/control/user-settings-page.js";
import { pageError404 } from "./static/pages/404/control/error-page-404.js";
import Router from "./static/global/classes/class-Router.js";
let pathname = window.location.pathname;
pathname = (pathname === '/') ? "/auth" : pathname;
const router = new Router();
router
    .use("/auth", pageAuthorization)
    .use("/users", pageUsers)
    .use("/chat", pageChat)
    .use("/registration", pageRegistration)
    .use("/settings", pageUserSettings)
    .use("/error", pageError404)
    .start();
document.addEventListener('click', (e) => {
    if (typeof e.target.dataset.route !== 'undefined') {
        e.preventDefault();
        let path = e.target.dataset.route;
        console.log(path);
        router.go(path);
    }
});
router.go(pathname);
//# sourceMappingURL=app.js.map