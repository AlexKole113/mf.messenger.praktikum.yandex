import Page from "../../../global/classes/class-Page.js";
import ErrorShow from "../../../components/error/control/error.js";
import {errorPage} from "../view/error.tmp.js";


//пока так
let queryObj = location.search.substring(1, location.search.length).split('&');

let pageError = new Page( 'main.container', errorPage, {
    error_block: new ErrorShow('div#error-block',{
        code: decodeURI( queryObj[0].split('=')[1] ),
        text: decodeURI( queryObj[1].split('=')[1] )
    }),
});


export {pageError}




