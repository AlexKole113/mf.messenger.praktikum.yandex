declare module '*';

interface Sender {
    get:    HTTPSenderFunc,
    post:   HTTPSenderFunc,
    put:    HTTPSenderFunc,
    delete: HTTPSenderFunc,
}

interface Api {
    registration:   ( data:RegistrationData ) => PromiseLike<any>,
    authorization:  ( data:AuthorizationData ) => PromiseLike<any>,
    logout:         ( data:object|null ) => PromiseLike<any>,
}

interface EventBus {
    on:   ( event:string, callback:CallableFunction ) => void,
    off:  ( event:string, callback:CallableFunction ) => void,
    emit: ( event:string, ...args:any ) => void,
}

interface Block {
    setProps:   ( nextProps:object|Block ) => Block,
    render:     ( elm?:string, temp?:string)  => void,
    getElement: ( temp?:string)  => string,
}

interface Route {
    leave:  CallableFunction,
    hide:   CallableFunction,
    show:   CallableFunction,
    render: CallableFunction,
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


type RegistrationData = {
    first_name:  string,
    second_name: string,
    login:       string,
    email:       string,
    password:    string,
    phone:       string,
}

type AuthorizationData = {
    login:    string,
    password: string
}



type HTTPSender  = {
    [key:string] : HTTPSenderFunc
}|any;


type ApiExample = {
    [key:string] :any
}

type props = {
    [index:string]:any,
};

type templateContent = {
    [index:string]:any
}

type HTTPSenderFunc = ( url:string, options:{[key:string]:any} ) => PromiseLike<any>;
type template       = string;



