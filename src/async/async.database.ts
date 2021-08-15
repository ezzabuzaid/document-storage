import { IAsyncStorage } from "../types";
import { AsyncCollection } from "./async.collection";
import { Database } from '../database';
import { Entity } from "../entity";

export class AsyncDatabase extends Database<IAsyncStorage<any>, AsyncCollection<any>> {

    /**
     * Get the collection to able to access the write and read the data
     */
    collection<T extends Entity<Record<string, any>>>(name: string): AsyncCollection<T> {
        return this.get(name) || this.create(name, AsyncCollection);
    }

    /**
     * Clear the entire datebase
     */
    async clear() {
        const names = Object.keys(this.collections);
        for (const name of names) {
            const collection = this.collections[name];
            await collection.clear()
        }
    }

}