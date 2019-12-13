
export class Database<TStorage, TCollection> {
    protected collections: { [index: string]: TCollection } = {};

    constructor(
        private storage: TStorage
    ) { }

    protected get(name: string): TCollection {
        return this.collections[name];
    }

    protected create(name: string, BaseCollection) {
        const collection = new (BaseCollection as any)(this.storage, name);
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
