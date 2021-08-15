import { clear, get, set, Store } from 'idb-keyval';
import { IAsyncStorage } from '../types';

export class KeyValueStore<T> implements IAsyncStorage<T> {
    private databaseName = 'StorageStrategy';
    private store: Store;
    constructor(
        private name: string,
    ) {
        this.store = new Store(this.databaseName, this.name);
    }

    public async set(name: string, value: T) {
        return set(name, value, this.store);
    }

    public get(name: string) {
        return get<T>(name, this.store);
    }

    public async clear() {
        return clear(this.store)
    }

}
