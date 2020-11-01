import Page from "../../../global/classes/class-Page.js";
import ErrorShow from "../../../components/error/control/error.js";
import {errorPage} from "../view/error.tmp.js";



let pageError404 = new Page( 'main.container', errorPage, {
    error_block: new ErrorShow('div#error-block',{
        code: `404`,
        text: `Страница не найдена`
    }),
});


export {pageError404}




