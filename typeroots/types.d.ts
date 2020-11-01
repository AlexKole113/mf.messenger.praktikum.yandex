declare module '*';

interface EventBus {
    on:   CallableFunction,
    off:  CallableFunction,
    emit: CallableFunction,
}

interface Route {
    leave:  CallableFunction,
    hide:   CallableFunction,
    show:   CallableFunction,
    render: CallableFunction,
}
type RouteType = {
    leave:  CallableFunction,
    hide:   CallableFunction,
    show:   CallableFunction,
    render: CallableFunction,
    match:  CallableFunction
}



interface Block {
    setProps:   CallableFunction,
    render:     CallableFunction,
    getElement: CallableFunction,
}

interface User {}

type props = {
    [index:string]:any,
};

type templateContent = {
    [index:string]:any
}

type template = string;


