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
        const index = entites.findIndex(find(+id, 'id'));
        if (index > -1) {
            return {
                entity: entites[index],
                index
            }
        }
        return null;
    }

    public async create(entity: T): Promise<Entity<T>> {
        const entites = await this.getAll();
        entity['id' as any] = Math.max(...entites.map(entity => +entity.id)) + 1;
        entites.push(entity as Entity<T>);
        await this.update(entites);
        return entity as Entity<T>;
    }

    public async put(entity: Entity<T>): Promise<Entity<T>> {
        const entites = await this.getAll();
        const exist = this.isExist(entites, entity.id);
        if (entity.id && !!!exist) {
            return null;
        }
        entites[exist.index] = entity;
        await this.update(entites);
        return exist.entity;
    }

    public async delete(id: number): Promise<Entity<T>> {
        const entites = await this.getAll();
        const exist = this.isExist(entites, id);
        if (!exist) {
            return null;
        }
        entites.splice(exist.index, 1);
        await this.update(entites);
        return exist.entity;
    }

    public async get(queryCallback: (object: Entity<T>) => boolean) {
        const entites = await this.getAll();
        return entites.find(queryCallback);
    }

    public async getAll() {
        return (await this.storage.get<T>(this.name)) || [] as unknown as Entity<T>[];
    }

    public async clear() {
        return this.storage.clear(this.name);
    }
}
