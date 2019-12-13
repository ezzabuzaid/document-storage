import { SyncCollection } from './sync.collection';
import { SyncStorage } from '../types';
import { Database } from '../database';

export class SyncDatabase extends Database<SyncStorage, SyncCollection<any>> {
    /**
     * get the collection to able to access the write and read the data
     */
    collection<T extends SyncCollection<any>>(name: string): T {
        return this.get(name) || this.create(name, SyncCollection);
    }

    /**
     * clear the entire datebase
     * NOTE this will note gonna remove the object it self so you can reassign values to it 
     */
    clear() {
        Object.keys(this.collections)
            .forEach(name => {
                this.get(name).clear();
            });
    }

}

// const database1 = new Database(new LocalStorage('testDB'));
// const database3 = new Database(new SessionStorage('testDB'));
// const database2 = new Database(new InMemory());
// TODO schema validation