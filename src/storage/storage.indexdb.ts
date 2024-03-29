import { IDBPDatabase, openDB, IDBPTransaction } from 'idb';
import { IAsyncStorage } from '../types';
export class IndexedDB<T> implements IAsyncStorage<T> {
    private database: IDBPDatabase | null = null;
    private databaseName = 'StorageStrategy';
    constructor(
        private objectStoreName: string,
        private version = 1
    ) { }

    private async openDatabase(version = this.version, force = false) {
        if (!force && this.database) {
            return this.database;
        }
        return this.database = await openDB(this.databaseName, version, { upgrade: this.onUpgrade.bind(this) });
    }

    private onUpgrade(database: IDBPDatabase, oldVersion: number, newVersion: number, transaction: IDBPTransaction) {
        if (!database.objectStoreNames.contains(this.objectStoreName)) {
            database.createObjectStore(this.objectStoreName, { keyPath: 'name' });
        }
    }

    private async transaction() {
        try {
            return (await this.openDatabase()).transaction(this.objectStoreName, 'readwrite');
        } catch (error) {
            // TODO: if object store not exist an DOMException will thrown, this should be handled gracefully
            return (await this.openDatabase(this.database ? this.database.version + 1 : 1, true)).transaction(this.objectStoreName, 'readwrite');
        }
    }

    private async objectStore() {
        return (await this.transaction()).objectStore(this.objectStoreName);
    }

    public async set(name: string, value: any) {
        const store = await this.objectStore();
        const list = await store.getAll();
        const document = list.find(doc => doc.name === name);
        if (!!document) {
            document.value = clone(value);
            return store.put(document) as unknown as Promise<void>;
        } else {
            return store.add({ name, value: clone(value) }) as unknown as Promise<void>;
        }
    }

    public async get(name: string) {
        const list = await (await this.objectStore()).getAll();
        const document = list.find(doc => doc.name === name);
        return document && clone(document.value);
    }

    public async clear() {
        return (await this.objectStore()).clear();
    }

}

function clone<T>(target: T) {
    return JSON.parse(JSON.stringify(target));
}