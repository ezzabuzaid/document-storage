import { SyncStorage } from "../types";

export class InMemory implements SyncStorage {
    storage = {};
    constructor() { }

    /**
     * 
     * @param name get the value from the storage
     */
    get<T>(name: string): T {
        return this.storage[name] || null;
    }

    /**
     * 
     * @param name name of the entity, will be used in the other operation
     * store the value or override a presisted value
     */
    set<T>(name: string, value: T) {
        this.storage[name] = value;
        return value;
    }

    /**
     * 
     * @param name name of the entity,
     * store the value as null
     */
    delete<T>(name: string): T {
        const entity = this.storage[name];
        this.storage[name] = null;
        return entity;
    }

    /**
     * free up the storage
     */
    clear() {
        this.storage = {};
    }

}
