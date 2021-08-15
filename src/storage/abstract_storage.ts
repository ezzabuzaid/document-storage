export abstract class AbstractStorage<T> {

    constructor(
        public name: string,
        private storage: any,
    ) { }

    /**
     * @internal
     */
    private dataSet() {
        const item = this.storage.getItem(this.name);
        const storage = item ? JSON.parse(item) : null;
        return storage || {};
    }

    /**
     * @internal
     */
    private presist(name: string, value: any) {
        const item = this.dataSet();
        const temp = item[name];
        item[name] = value;
        this.storage.setItem(this.name, JSON.stringify(item));
        return temp as T;
    }

    /**
     * 
     * @param name name of the entity
     */
    public set(name: string, value: T) {
        return this.presist(name, value);
    }

    /**
     * 
     * @param name name of the entity
     */
    public get(name: string): T {
        return this.dataSet()[name] || null;
    }

    /**
     * 
     * clear out the entire dataSet
     * this will store the data set as plain object
     */
    public clear() {
        this.storage.removeItem(this.name);
        this.storage.setItem(this.name, JSON.stringify({}));
    }

    /**
     * 
     * @param name name of the entity
     * store the value as null
     */
    public delete(name: string) {
        return this.presist(name, null);
    }

}