declare module '*';

interface EventBus {
    on:   CallableFunction,
    off:  CallableFunction,
    emit: CallableFunction,
}

interface Block {
    setProps:   CallableFunction,
    render:     CallableFunction,
    getElement: CallableFunction
}

interface User {}

type props = {
    [index:string]:any,
};

type templateContent = {
    [index:string]:any
}

type template = string;


