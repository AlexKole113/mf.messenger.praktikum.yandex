var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'mocha';
import * as chai from 'chai';
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
require("babel-core/register");
require("babel-polyfill");
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
global.window = window;
import Templator from "../global/classes/class-Templator.js";
import Router from "../global/classes/class-Router.js";
import HTTPTransport from "../global/classes/class-HTTPTransport.js";
import Page from "../global/classes/class-Page.js";
import Message from "../components/message/control/message.js";
import Button from "../components/button/control/button.js";
// #0 -  шаблонизатора, компоненты,  роутера,  модуля отправки запросов. Понадобятся позитивные кейсы, негативные, фаззинг-тестирование и проверка граничных значений.
// #1 Тестируем публичный интерфейс сущностей (модулей) - те те методы через которые используются публично и взаимодействуют с др модулями
// #2 Проверяется возврат значений (return), изменение стостояния объекта (this.что-то), выполнение обращения к внешней системе (fetch, HTTPXML)
// #3 3 - стадии ( подготовка , действие , проверка )
// #4  Перед тестом нужно понять - что является тестируемой сущностью, какой сценарий проверяется в тесте и какой результат проверяется
describe('Отправка и получение данных с бэка', () => {
    it('Создание get строки', () => {
        const tst = new HTTPTransport();
        const getString = tst.queryStringify({ 'key1': 1, 'key2': { d: '2', g: [3, 4] }, 'key3': { 'e': '5' } });
        expect(getString).to.equal('?key1=1&key2[d]=2&key2[g][0]=3&key2[g][1]=4&key3[e]=5');
    });
    it('Отправка HTTPTransport GET', () => {
        const tst = new HTTPTransport('localhost');
        tst.request = (options = {}, timeout) => {
            const { method, data } = options;
            expect(tst.url).to.equal('localhost');
            expect(method).to.equal('GET');
            expect(data).to.equal('?somedata[0]=1&somedata[1]=2');
        };
        tst.get({ data: { 'somedata': [1, 2] } });
    });
    it('Отправка HTTPTransport POST', () => {
        const tst = new HTTPTransport('localhost');
        tst.request = (options = {}, timeout) => {
            const { method, data } = options;
            expect(tst.url).to.equal('localhost');
            expect(method).to.equal('POST');
            expect(data).to.deep.equal({ 'somedata': [1, 2] });
        };
        tst.post({ data: { 'somedata': [1, 2] } });
    });
    it('Получение HTTPTransport', () => __awaiter(void 0, void 0, void 0, function* () {
        const tst = new HTTPTransport('localhost');
        tst.request = (options = {}, timeout) => {
            const { data } = options;
            return Promise.resolve({ response: data });
        };
        const response = yield tst.post({ data: { 'somedata': [1, 2] } });
        expect(response.response).to.deep.equal({ 'somedata': [1, 2] });
    }));
    // TODO: не передача url и данных
    // TODO: возврат ошибки с сервера
    // TODO: таймаут и за таймаутом
});
describe('Шаблоны и компоненты', () => {
    it('Создание HTML из шаблона c заменой символов', () => {
        const componentTemplate = `<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >{{text}}</button>`;
        const templator = new Templator(componentTemplate);
        expect(templator.compile({ text: '<h1>Текст кнопки</h1>' })).to.equal(`<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >&lt;h1&gt;Текст кнопки&lt;/h1&gt;</button>`);
    });
    it('Создание HTML из шаблона без замены символов', () => {
        const componentTemplate = `<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >{{{text}}}</button>`;
        const templator = new Templator(componentTemplate);
        expect(templator.compile({ text: '<h1>Текст кнопки</h1>' })).to.equal(`<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" ><h1>Текст кнопки</h1></button>`);
    });
    it('Создание свойств компонента', () => {
        const message = new Message('div#messagelist-component', [{ content: 'sometextSomeText', time: '10:00' }]);
        expect(message.getElement()).to.includes('sometextSomeText');
        expect(message.getElement()).to.includes('10:00');
    });
    it('Изменение свойств компонента', () => {
        const textUndo = 'TextUndo';
        const button = new Button('div#btn-component', { text: textUndo });
        expect(button.getElement()).to.equal(`<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >${textUndo}</button>`);
        const textAfter = 'TextAfter';
        button.setProps({ text: textAfter });
        expect(button.getElement()).to.equal(`<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >${textAfter}</button>`);
    });
    // TODO: Templator -> передача не корректного шаблона (undefined) , отсутсвие шаблона , отсутствие полей нужных в шаблоне
    // TODO: Компонент -> передача вместо свойств бреда
    // TODO: Компонент -> передача не корректного времени -> ^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$
});
describe('Роутинг', () => {
    it('Роутер - пушим и получаем роуты', () => {
        const router = new Router();
        const page = new Page();
        router
            .use("/test1", page)
            .use("/test2", page)
            .use("/test3", page);
        expect(router.getRoute("/test1")._pathname).to.equal("/test1");
        expect(router.getRoute("/test2")._pathname).to.equal("/test2");
        expect(router.getRoute("/test3")._pathname).to.equal("/test3");
    });
    it('Роутер - переходы', () => {
        const router = new Router();
        router.start = () => { };
        router.go = (pathname) => { router._onRoute(pathname); };
        const page = new Page();
        router
            .use("/test1", page)
            .use("/test2", page)
            .use("/test3", page);
        router.go("/test2");
        expect(router._currentRoute._pathname).to.equal("/test2");
        router.go("/test1");
        expect(router._currentRoute._pathname).to.equal("/test1");
    });
    it('Роутер - переход на не существующий адрес', () => {
        const router = new Router();
        router.start = () => { };
        router.go = (pathname) => { router._onRoute(pathname); };
        const page = new Page();
        router
            .use('/error', page)
            .use("/test2", page)
            .use("/test3", page);
        router.go("/andresDoNotExist1234");
        expect(router._currentRoute._pathname).to.equal('/error');
    });
    // TODO: отсутствие page
    // TODO: создание длинющего path
});
//# sourceMappingURL=test.js.map