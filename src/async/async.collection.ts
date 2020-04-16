import { isItemExist, not, isNullOrUndefiend } from "../utils";
import { IAsyncStorage, Entity } from "../types";
export class AsyncCollection<T> {

    constructor(
        private storage: IAsyncStorage,
        private name: string,
    ) { }

    private async _create(entites: Entity<T>[], entity: T) {
        entity['id' as any] = Date.now();
        entites.push(entity as Entity<T>);
        await this.update(entites);
        return entity as Entity<T>;
    }

    private async _put(entites: Entity<T>[], entity: Entity<T>, existance: ReturnType<typeof isItemExist>) {
        entites[existance.index] = entity;
        await this.update(entites);
        return entity;
    }

    private update(entites: Entity<T>[]) {
        return this.storage.set<T>(this.name, entites);
    }

    public async create(entity: T): Promise<Entity<T>> {
        return this._create(await this.getAll(), entity);
    }

    public async put(entity: Entity<T>): Promise<Entity<T>> {
        const entites = await this.getAll();
        const exist = isItemExist(entites, entity.id);
        if (not(exist)) {
            return null;
        }
        return this._put(entites, entity, exist);
    }

    public async set(entity: T) {
        const entites = await this.getAll();
        const id = entity['id'];
        if (not(isNullOrUndefiend(id))) {
            const exist = isItemExist(entites, id);
            if (not(exist)) {
                entity['id'] = null;
                await this.set(entity);
            } else {
                return this._put(entites, entity as Entity<T>, exist);
            }
        } else {
            return this._create(entites, entity);
        }
    }

    public async delete(id: number): Promise<Entity<T>> {
        const entites = await this.getAll();
        const exist = isItemExist(entites, id);
        if (not(exist)) {
            return null;
        }
        entites.splice(exist.index, 1);
        await this.update(entites);
        return exist.entity;
    }

    public async get(queryCallback: (object: Entity<T>, index?: number) => boolean) {
        const entites = await this.getAll();
        return entites.find(queryCallback) || null;
    }

    public async getAll() {
        return (await this.storage.get<T>(this.name)) || [];
    }

    public async clear() {
        await this.storage.clear(this.name);
    }

}
