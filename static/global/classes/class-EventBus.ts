
export default class EventBus implements EventBus {
    private listeners: Record<string, CallableFunction[]> = {};

    constructor() {
        this.listeners = {};
    }

    public on( event:string, callback:CallableFunction ) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off( event:string, callback:CallableFunction ) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    public emit( event:string, ...args:any ) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}