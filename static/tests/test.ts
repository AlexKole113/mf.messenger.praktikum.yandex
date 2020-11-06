// @ts-nocheck
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
global.window   = window;


import Templator from "../global/classes/class-Templator.js";
import Router from "../global/classes/class-Router.js";
import HTTPTransport from "../global/classes/class-HTTPTransport.js";
import Page from "../global/classes/class-Page.js";
import Message from "../components/message/control/message.js";
import Button from "../components/button/control/button.js";


describe( 'Шаблоны и компоненты', () => {
    it('Создание HTML из шаблона c заменой символов', () => {
        const componentTemplate = `<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >{{text}}</button>`;
        const templator = new Templator( componentTemplate );
        expect( templator.compile({ text: '<h1>Текст кнопки</h1>' } )  ).to.equal(`<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >&lt;h1&gt;Текст кнопки&lt;/h1&gt;</button>`);
    });
    it('Создание HTML из шаблона без замены символов', () => {
        const componentTemplate = `<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >{{{text}}}</button>`;
        const templator = new Templator( componentTemplate );
        expect( templator.compile({ text: '<h1>Текст кнопки</h1>' } )  ).to.equal(`<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" ><h1>Текст кнопки</h1></button>`);
    });
    it('Создание свойств компонента', () => {
        const message  = new Message('div#messagelist-component', [{ content: 'sometextSomeText', time: '10:00' }] );
        expect( message.getElement() ).to.includes('sometextSomeText');
        expect( message.getElement() ).to.includes('10:00');
    });
    it('Изменение свойств компонента', () => {
        const textUndo = 'TextUndo';
        const button   = new Button('div#btn-component',{ text: textUndo });
        expect( button.getElement() ).to.equal(`<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >${textUndo}</button>`);
        const textAfter = 'TextAfter';
        button.setProps({ text: textAfter })
        expect( button.getElement() ).to.equal(`<button type="submit" class="form-registration__input-group-item-btn bg_dark-min text-light-max" >${textAfter}</button>`);
    });
    it('Передача на вход не корректных данных', () => {
        const templator = new Templator( undefined );
        expect( templator.compile.bind( templator ) ).to.throw('Не загружен шаблон')
    });
});

describe('Роутинг', () => {
    it('Роутер - пушим и получаем роуты', () => {
        const page1     = new Page('body',`<div class="error-msg"></div>`, {} );
        const page2     = new Page('body',`<div class="error-msg"></div>`, {} );
        const page3     = new Page('body',`<div class="error-msg"></div>`, {} );
        const router    = new Router();
        router
            .use("/test1", page1  )
            .use("/test2", page2 )
            .use("/test3", page3  )

        expect( router.getRoute("/test1")._pathname ).to.equal( "/test1" );
        expect( router.getRoute("/test2")._pathname ).to.equal( "/test2" );
        expect( router.getRoute("/test3")._pathname ).to.equal( "/test3" );
    });
    it('Роутер - переходы', () => {
        const page4      = new Page('body',`<div class="error-msg"></div>`, {} );
        const page5      = new Page('body',`<div class="error-msg"></div>`, {} );
        const page6      = new Page('body',`<div class="error-msg"></div>`, {} );
        const router     = new Router('.app');
        router.go        = ( pathname ) => {  router._onRoute( pathname ) }

        router
            .use('/test4', page4  )
            .use("/test5", page5 )
            .use("/test6", page6  )

        //console.log(router.routes)

        router.go("/test4" );
        expect( router._currentRoute._pathname ).to.equal( '/test4' );

        router.go("/test6" );
        expect( router._currentRoute._pathname ).to.equal( '/test6' );

    });
    it('Роутер - переход на не существующий адрес', () => {
        const page7      = new Page('body',`<div class="error-msg"></div>`, {} );
        const page8      = new Page('body',`<div class="error-msg"></div>`, {} );
        const page9      = new Page('body',`<div class="error-msg"></div>`, {} );
        const router     = new Router();
        router.go        = ( pathname ) => { router._onRoute( pathname ) }

        router
            .use('/error', page7  )
            .use("/test8", page8 )
            .use("/test9", page9  )

        router.go("/andresDoNotExist1234" );
        expect( router._currentRoute._pathname ).to.equal( '/error' );
    });
});

describe('Отправка и получение данных с бэка', () => {
    it('Создание get строки', () => {
        const tst       = new HTTPTransport();
        const getString =  tst.queryStringify({ 'key1' : 1, 'key2' : { d: '2', g: [3,4] }, 'key3': {'e': '5' } }  );
        expect(getString).to.equal('?key1=1&key2[d]=2&key2[g][0]=3&key2[g][1]=4&key3[e]=5');
    });
    it('Отправка HTTPTransport GET', () => {
        const tst       = new HTTPTransport('localhost');
        tst.request     = (options:{[key:string]:any} = {}, timeout:number ) => {
            const {method, data } = options;

            expect( tst.url ).to.equal( 'localhost' );
            expect( method ).to.equal( 'GET' );
            expect( data ).to.equal( '?somedata[0]=1&somedata[1]=2' );

        }

        tst.get({ data : {'somedata': [1,2]} } );

    });
    it('Отправка HTTPTransport POST', () => {
        const tst       = new HTTPTransport('localhost');
        tst.request     = ( options:{[key:string]:any} = {}, timeout:number ) => {
            const {method, data } = options;

            expect( tst.url ).to.equal( 'localhost' );
            expect( method ).to.equal( 'POST' );
            expect( data ).to.deep.equal( { 'somedata': [1,2] } );

        }

        tst.post({ data : {'somedata': [1,2]} } );
    });
    it('Получение HTTPTransport', async () => {
        const tst       = new HTTPTransport('localhost');
        tst.request     = ( options:{[key:string]:any} = {}, timeout:number ) => {
            const { data } = options;
            return Promise.resolve({ response: data } );
        }

        const response = await tst.post({ data : {'somedata': [1,2]} } );

        expect( response.response ).to.deep.equal( { 'somedata': [1,2] } );

    });
});










