import { Storage } from "../types";

export class InMemory implements Storage {
    storage = {};
    constructor() { }

    get<T>(name: string): T {
        return this.storage[name];
    }

    set<T>(name: string, value: T) {
        this.storage[name] = value;
        return value;
    }

    delete<T>(name: string): T {
        return this.storage[name];
    }

    clear() {
        this.storage = {};
    }

}
