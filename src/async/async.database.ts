import { AsyncStorage } from "../types";
import { AsyncCollection } from "./async.collection";
import { Database } from '../database';

export class AsyncDatabase extends Database<AsyncStorage, AsyncCollection<any>> {

    /**
     * get the collection to able to access the write and read the data
     */
    collection<T extends AsyncCollection<any>>(name: string): T {
        return this.get(name) || this.create(name, AsyncCollection);
    }

    /**
     * clear the entire datebase
     * NOTE this will note gonna remove the object it self so you can reassign values to it 
     */
    async clear() {
        const names = Object.keys(this.collections);
        for (const name of names) {
            const collection = this.collections[name];
            await collection.clear()
        }
    }

}