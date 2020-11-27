import EventBus from "../classes/class-EventBus.js";
import HTTPTransport from "../classes/class-HTTPTransport.js";
const GLOBAL_EVENTS = {
    HOOKS: {
        APP_START: 'APP_START',
        APP_FATAL_ERROR: 'APP_ERROR',
        APP_EXIT: 'APP_EXIT',
    },
    BUS: new EventBus()
};
//ADD HOOKS
GLOBAL_EVENTS.BUS.on(GLOBAL_EVENTS.HOOKS.APP_START, HTTP_SETUP);
GLOBAL_EVENTS.BUS.on(GLOBAL_EVENTS.HOOKS.APP_FATAL_ERROR, FATAL_ERROR);
//...
//...
// FUNCTIONS
function HTTP_SETUP() {
    window.APPTransport = new HTTPTransport();
}
function FATAL_ERROR() {
    throw Error('FATAL ERROR');
}
export { GLOBAL_EVENTS };
//# sourceMappingURL=hooks.js.map