import { IDBPDatabase, openDB, IDBPTransaction } from 'idb';
import { AsyncStorage } from '../types';
export class IndexedDB implements AsyncStorage {
    private database: IDBPDatabase = null;
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
            return (await this.openDatabase(this.database.version + 1, true)).transaction(this.objectStoreName, 'readwrite');
        }
    }

    private async objectStore() {
        return (await this.transaction()).objectStore(this.objectStoreName);
    }

    public async set<T>(name: string, value) {
        const store = (await this.objectStore());
        const list = await store.getAll();
        const document = list.find(doc => doc.name === name);
        if (!!document) {
            document.value = value;
            return store.put(document) as unknown as Promise<T>;
        } else {
            return store.add({ name, value }) as unknown as Promise<T>;
        }
    }

    public async get<T>(name: string) {
        const list = await (await this.objectStore()).getAll();
        const document = list.find(doc => doc.name === name);
        return document && document.value;
    }

    public async clear() {
        return (await this.objectStore()).clear();
    }

}