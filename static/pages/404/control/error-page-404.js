import Page from "../../../global/classes/class-Page";
import ErrorShow from "../../../components/error/control/error";
import { errorPage } from "../view/error.tmp";
let pageError404 = new Page('main.container', errorPage, {
    error_block: new ErrorShow('div#error-block', {
        code: `404`,
        text: `Страница не найдена`
    }),
});
export { pageError404 };
//# sourceMappingURL=error-page-404.js.map