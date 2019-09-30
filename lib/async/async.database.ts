import { Collection } from "../sync/sync.collection";
import { AsyncStorage } from "../types";
import { AsyncCollection } from "./async.collection";

export class AsyncDatabase {
    private collections: { [index: string]: AsyncCollection<any> } = {};

    private get<T>(name: string) {
        return this.collections[name] as AsyncCollection<T>;
    }

    private create<T>(name: string) {
        const collection = new AsyncCollection<T>(this.storage, name);
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