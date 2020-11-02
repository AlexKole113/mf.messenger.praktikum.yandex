import Templator from "../global/classes/class-Templator.js";
import Router from "../global/classes/class-Router.js";
import Block from "../global/classes/class-Block.js";
import HTTPTransport from "../global/classes/class-HTTPTransport.js";


// #1 Тестируем публичный интерфейс сущностей (модулей) - те те методы через которые используются публично и взаимодействуют с др модулями
// #2 Проверяется возврат значений (return), изменение стостояния объекта (this.что-то), выполнение обращения к внешней системе (fetch, HTTPXML)
// #3 3 - стадии ( подготовка , действие , проверка )
// #4  Перед тестом нужно понять - что является тестируемой сущностью, какой сценарий проверяется в тесте и какой результат проверяется
// describe - группировка


// import HTTPTransport from "./static/global/classes/class-HTTPTransport.js";
// let tst = new HTTPTransport();
// tst.queryStringify({ 'key1' : 1, 'key2' : { d: '2', g: [3,4] }, 'key3': {'e': '5' } }  )

