import { Store, clear, get, set } from 'idb-keyval';
import { IAsyncStorage } from '../types';
import { Entity } from "../entity";

export class KeyValueStore implements IAsyncStorage {
    private databaseName = 'StorageStrategy';
    private store: Store;
    constructor(
        private name: string,
    ) {
        this.store = new Store(this.databaseName, this.name);
    }

    public async set<T>(name: string, value: T) {
        return set(name, value, this.store);
    }

    public get<T>(name: string) {
        return get<Entity<T>>(name, this.store);
    }

    public async clear() {
        return clear(this.store)
    }

}
