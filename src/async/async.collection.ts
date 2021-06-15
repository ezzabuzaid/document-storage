import { Existance, IAsyncStorage, QueryCallback } from "../types";
import { addId, hasId, isItemExist, not } from "../utils";
import { Entity, EntityId } from "../entity";

export class AsyncCollection<T> {

    constructor(
        private storage: IAsyncStorage,
        private name: string,
    ) { }

    private async _create(entites: Entity<T>[], entity: T) {
        addId(entity, hasId(entity) ? entity.id : undefined);
        entites.push(entity as Entity<T>);
        await this.update(entites);
        return entity as Entity<T>;
    }

    private async _put(entites: Entity<T>[], entity: Entity<T>, existance: Existance<T>) {
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

    public async put(entity: Entity<T>): Promise<Entity<T> | null> {
        const entites = await this.getAll();
        const exist = isItemExist(entites, entity.id);
        if (not(exist)) {
            return null;
        }
        return this._put(entites, entity, exist);
    }

    public async set(entity: T) {
        const entites = await this.getAll();

        if (hasId(entity)) {
            const exist = isItemExist(entites, entity.id);
            if (not(exist)) {
                addId(entity, null);
                await this.set(entity);
            } else {
                return this._put(entites, entity, exist);
            }
        } else {
            return this._create(entites, entity);
        }
    }

    public async delete(id: EntityId): Promise<Entity<T> | null> {
        const entites = await this.getAll();
        const exist = isItemExist(entites, id);
        if (not(exist)) {
            return null;
        }
        entites.splice(exist.index, 1);
        await this.update(entites);
        return exist.entity;
    }

    public async get(queryCallback: QueryCallback<T>) {
        const entites = await this.getAll();
        return entites.find(queryCallback) || null;
    }

    public async getAll(queryCallback?: QueryCallback<T>) {
        const entites = (await this.storage.get<T>(this.name)) ?? [];
        if (Array.isArray(entites)) {
            return queryCallback ? entites.filter(queryCallback) : entites;
        }
        throw new TypeError(`${ this.name } is not array type`);
    }

    public async clear() {
        await this.storage.clear(this.name);
    }

}
