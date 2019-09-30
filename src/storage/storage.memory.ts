import { SyncStorage } from "../types";

export class InMemory implements SyncStorage {
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
