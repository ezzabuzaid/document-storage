import { Existance, IAsyncStorage, QueryCallback } from "../types";
import { addId, hasId, isItemExist, not } from "../utils";
import { Entity, EntityId } from "../entity";

export class AsyncCollection<T extends Entity<Record<any, any>>> {

    constructor(
        private storage: IAsyncStorage<T[]>,
        private name: string,
    ) { }

    private async _create(entites: T[], entity: T | Omit<T, 'id'>) {
        addId(entity, hasId(entity) ? entity.id : undefined);
        entites.push(entity);
        await this.update(entites);
        return entity;
    }

    private async _put(entites: T[], entity: T, existance: Existance<T>) {
        entites[existance.index] = entity;
        await this.update(entites);
        return entity;
    }

    private update(entites: T[]) {
        return this.storage.set(this.name, entites);
    }

    public async create(entity: T | Omit<T, 'id'>): Promise<T> {
        return this._create(await this.getAll(), entity);
    }

    public async put(entity: T): Promise<T | null> {
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
                return this._create(entites, entity);
            } else {
                return this._put(entites, entity, exist);
            }
        } else {
            return this._create(entites, entity);
        }
    }

    public async delete(id: EntityId) {
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

    public async getAll(queryCallback?: QueryCallback<T>): Promise<T[]> {
        const entites = (await this.storage.get(this.name)) ?? [];
        if (Array.isArray(entites)) {
            return queryCallback ? entites.filter(queryCallback) : entites.slice(0);
        }
        throw new TypeError(`${ this.name } is not array type`);
    }

    public async clear() {
        await this.storage.clear();
    }

}
