import { LocalStorage } from './localstorage';
import { DatabaseProvider } from './provider';
import { Storage } from '..';
import { IndexDB } from './indexdb';


export class Database {
    // TODO Adapter class to convert existing database interface to meet the generic database provider
    // REVIEW private provider = new DatabaseProvider(new DatabaseAdabter(new LocalStorage));

    private provider: DatabaseProvider;
    constructor(storage: Storage) {
        this.provider = new DatabaseProvider(storage);
    }


    /**
     * 
     * @param name name of collection
     * get the collection to able to access the write and read the data
     */
    collection<T>(name: string) {
        return this.provider.get<T>(name);
    }

    /**
     * 
     * @param name collection name
     * invoke this method remove a collection from the database
     */
    remove(name: string) {
        this.provider.remove(name);
    }

    /**
     * clear the entire datebase
     * NOTE this will note gonna remove the object it self so you can reassign values to it 
     */
    clear() {
        this.provider.collections
            .forEach(collection => {
                this.provider.remove(collection.name);
            })
    }

}
const database1 = new Database(new LocalStorage('testDB'));
database1.collection<{ z: number }>('').get('test', 'test');
// const database2 = new Database(new IndexDB('testDB'));

// TODO schema validation