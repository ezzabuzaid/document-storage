import { Storage } from "..";

export class InMemory implements Storage {
    storage = {};
    constructor() { }

    get<T>(name: string): T {
        return this.storage[name];
    }

    set(name: string, value: any) {
        this.storage[name] = value;
    }

    delete<T>(name: string): T {
        return this.storage[name];
    }

    clear() {
        this.storage = {};
    }

}