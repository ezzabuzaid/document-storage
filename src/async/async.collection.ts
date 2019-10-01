import { find } from "../utils";
import { AsyncStorage, Entity } from "../types";
export class AsyncCollection<T> {

    constructor(
        private storage: AsyncStorage,
        private name: string,
    ) { }

    private update(entites: Entity<T>[]) {
        return this.storage.set(this.name, entites);
    }

    private isExist(entites: Entity<T>[], id: number) {
        return entites.find(find(id, 'id')) || null;
    }

    public async create(entity: Entity<T>): Promise<Entity<T>> {
        const entites = await this.getAll();
        entity['id' as any] = entites.length;
        entites.push(entity);
        await this.update(entites);
        return entity;
    }

    public async put(entity: Entity<T>): Promise<Entity<T>> {
        const entites = await this.getAll();
        if (entity.id && !this.isExist(entites, entity.id)) {
            return null;
        }
        entites[entity.id] = entity;
        await this.update(entites);
        return entity;
    }

    public async delete(id: number): Promise<Entity<T>> {
        const entites = await this.getAll();
        const entity = this.isExist(entites, id)
        if (!entity) {
            return null;
        }
        entites.splice(id, 1);
        await this.update(entites);
        return entity;
    }

    public async get(queryCallback: (object: Entity<T>) => boolean) {
        const entites = await this.getAll();
        return entites.find(queryCallback);
    }

    public async getAll() {
        return (await this.storage.get<Entity<T>[]>(this.name)) || [];
    }

    public async clear() {
        return this.storage.clear(this.name);
    }
}
