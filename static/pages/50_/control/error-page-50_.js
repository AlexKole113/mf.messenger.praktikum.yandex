import Page from "../../../global/classes/class-Page";
import ErrorShow from "../../../components/error/control/error";
import { errorPage } from "../view/error.tmp";
//пока так
let queryObj = location.search.substring(1, location.search.length).split('&');
let pageError = new Page('main.container', errorPage, {
    error_block: new ErrorShow('div#error-block', {
        code: decodeURI(queryObj[0].split('=')[1]),
        text: decodeURI(queryObj[1].split('=')[1])
    }),
});
export { pageError };
//# sourceMappingURL=error-page-50_.js.map