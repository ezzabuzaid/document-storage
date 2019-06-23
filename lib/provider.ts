import { Collection } from './collection';
import { Storage } from '..';
import { find } from './utils';

export class DatabaseProvider {
    // TODO use it as object instead of array
    collections: Collection<any>[] = [];

    constructor(
        private storage: Storage
    ) { }

    private create<T>(name: string) {
        const collection = new Collection<T>(this.storage, name)
        this.collections.push(collection);
        return collection;
    }

    get<T>(name: string) {
        return this.collections.find(find('name', name)) as Collection<T>;
    }

    set<T>(name: string) {
        return this.get<T>(name) || this.create<T>(name);
    }

    remove(name: string) {
        this.get(name).clear();
    }

}

