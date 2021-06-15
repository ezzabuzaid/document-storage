export class Database<TStorage, TCollection> {
    protected collections: { [index: string]: TCollection } = {};

    constructor(
        private storage: TStorage
    ) { }

    protected get(name: string): TCollection {
        return this.collections[name];
    }

    protected create<T extends { new(storage: TStorage, name: string): any }>(name: string, BaseCollection: T) {
        const collection = new BaseCollection(this.storage, name);
        this.collections[name] = collection;
        return collection;
    }

    /**
     * 
     * @param name check if the database has a collection by it's name
     * @returns boolean
     */
    public has(name: string) {
        return !!this.get(name);
    }

}
