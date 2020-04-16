import { SyncCollection } from './sync.collection';
import { ISyncStorage } from '../types';
import { Database } from '../database';

export class SyncDatabase extends Database<ISyncStorage, SyncCollection<any>> {
    /**
     * Return the collection if exist otherwise it will be created first then returned 
     * @param name the name of the collection to return
     * @returns {SyncCollection<T>}
     */
    collection<T>(name: string): SyncCollection<T> {
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
