import { AsyncStorage } from "..";
import { IDBPDatabase, openDB, DBSchema } from "idb";

const $window = (window as any);
$window.indexedDB = $window.indexedDB || $window.mozIndexedDB || $window.webkitIndexedDB || $window.msIndexedDB;
$window.IDBTransaction = $window.IDBTransaction || $window.webkitIDBTransaction || $window.msIDBTransaction || { READ_WRITE: 'readwrite' };
$window.IDBKeyRange = $window.IDBKeyRange || $window.webkitIDBKeyRange || $window.msIDBKeyRange;


export class IndexDB implements AsyncStorage {
    private database: IDBPDatabase = null;

    constructor(
        private name: string,
        private version = 4
    ) {
        openDB('StrategyStorage', this.version, { upgrade: this.onUpgrade })
            .then((database) => {
                this.database = database;
                this.database.createObjectStore(this.name, { keyPath: 'id', });
            });
    }

    private onUpgrade(db, oldVersion, newVersion, transaction) {

    }

    private get transaction() {
        return this.database.transaction(this.name, 'readwrite');
    }

    private get objectStore() {
        return this.transaction.objectStore(this.name);
    }

    set<T>(object) {
        this.objectStore.add(object);
        return this.objectStore.put(object) as unknown as Promise<T>;
    }

    get<T>(name: string) {
        return this.objectStore.get(name) as Promise<T>;
    }

    clear() {
        // NOTE must called in upgrade event
        return resolve(this.database.deleteObjectStore(name));
    }

    delete(name) {
        return this.objectStore.delete(name);
    }
}
const resolve = <T = void>(value) => Promise.resolve<T>(value);
