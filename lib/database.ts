import { LocalStorage } from './localstorage';
import { Storage, AsyncStorage } from '..';
import { InMemory } from './memory';
import { Collection } from './collection';
import { DatabaseProvider } from './provider';
import { IndexDB } from './indexdb';
import { SessionStorage } from './sessionstorage';


export class Database {
    private collections: { [index: string]: Collection<any> } = null;

    constructor(
        private storage: Storage
    ) { }

    private create<T>(name: string) {
        const collection = new Collection<T>(this.storage, name)
        this.collections[name] = collection;
        return collection;
    }

    private get<T>(name: string) {
        return this.collections[name] as Collection<T>;
    }

    has(name: string) {
        return !!this.get(name);
    }

    /**
     * 
     * @param name name of collection
     * 
     * get the collection to able to access the write and read the data
     */
    collection<T>(name: string) {
        return this.get<T>(name) || this.create<T>(name);
    }

    /**
     * clear the entire datebase
     * 
     * NOTE this will note gonna remove the object it self so you can reassign values to it 
     */
    clear() {
        Object.keys(this.collections)
            .forEach(name => {
                this.get(name).clear();
            })
    }

}

export class AsyncDatabase {
    private collections: { [index: string]: Collection<any> } = null;

    private get<T>(name: string) {
        return this.collections[name] as Collection<T>;
    }

    private create<T>(name: string) {
        const collection = new Collection<T>(this.storage, name)
        this.collections[name] = collection;
        return collection;
    }
    constructor(
        private storage: AsyncStorage
    ) { }

    /**
     * 
     * @param name name of collection
     * 
     * get the collection to able to access the write and read the data
     */
    collection<T>(name: string) {
        return this.get<T>(name) || this.create<T>(name);
    }

    /**
     * clear the entire datebase
     * 
     * NOTE this will note gonna remove the object it self so you can reassign values to it 
     */
    async clear() {
        // TODO ensure that this method is work
        const names = Object.keys(this.collections);
        for (const name of names) {
            const collection = this.collections[name];
            await collection.clear()
        }
    }

}
// const database1 = new Database(new LocalStorage('testDB'));
// const database3 = new Database(new SessionStorage('testDB'));
// const database2 = new Database(new InMemory());
// TODO schema validation
const asyncDatabase = new AsyncDatabase(new IndexDB('testDB'));