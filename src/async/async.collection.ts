import { find } from "../utils";
import { AsyncStorage, Entity } from "../types";
export class AsyncCollection<T> {

    constructor(
        private storage: AsyncStorage,
        private name: string,
    ) { }

    private update(entites: Entity<T>[]) {
        this.storage.set(this.name, entites);
    }

    private isExist(entites: Entity<T>[], id: number) {
        return entites.find(find(id, 'id')) || null;
    }

    private async  create(entity: T): Promise<Entity<T>> {
        const _entity = entity as Entity<T>;
        const entites = await this.getAll();
        _entity['id' as any] = entites.length;
        entites.push(_entity);
        await this.update(entites);
        return _entity;
    }

    private async  put(entity: T): Promise<Entity<T>> {
        const _entity = entity as Entity<T>;
        const entites = await this.getAll();
        if (!this.isExist(entites, _entity.id)) {
            return null;
        }
        const oldEntity = entites[_entity.id];
        entites[_entity.id] = entity as any;
        await this.update(entites);
        return oldEntity;
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

    public async set(entity: T): Promise<Entity<T>> {
        return this.put(entity) || this.create(entity);
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
