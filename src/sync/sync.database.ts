import { Collection } from './sync.collection';
import { SyncStorage } from '../types';

export class Database {
    private collections: { [index: string]: Collection<any> } = {};

    constructor(
        private storage: SyncStorage
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

// const database1 = new Database(new LocalStorage('testDB'));
// const database3 = new Database(new SessionStorage('testDB'));
// const database2 = new Database(new InMemory());
// TODO schema validation