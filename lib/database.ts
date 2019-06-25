import { LocalStorage } from './localstorage';
import { Storage } from '..';
import { InMemory } from './memory';
import { Collection } from './collection';
import { DatabaseProvider } from './provider';
import { IndexDB } from './indexdb';


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
const database1 = new Database(new LocalStorage('testDB'));
const database2 = new Database(new InMemory());
// TODO schema validation
// Async database new AsyncDatabase(new IndexDB('testDB'));