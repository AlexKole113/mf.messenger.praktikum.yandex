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

interface Api {
    registration: CallableFunction,
    authorization:CallableFunction,
    logout:       CallableFunction,
}

interface Sender {
    get:    CallableFunction,
    post:   CallableFunction,
    put:    CallableFunction,
    delete: CallableFunction,
}

type UserListProps = {
    login           :string,
    avatar          :string,
    active          :string|boolean
}[];


type RouteType = {
    leave:  CallableFunction,
    hide:   CallableFunction,
    show:   CallableFunction,
    render: CallableFunction,
    match:  CallableFunction
}

type ApiResponse = {
    status           :number,
    response         :any,
}|any;

type HTTPSender  = {
    [key:string] : CallableFunction
}|any;


type ApiExample = {
    [key:string] :any
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


