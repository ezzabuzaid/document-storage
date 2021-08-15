import { Existance, ISyncStorage, QueryCallback } from "../types";
import { addId, hasId, isItemExist, isNullOrUndefiend, not } from "../utils";
import { Entity, EntityId } from "../entity";

/**
 * 
 * Collection is a set of objects collected in @type {Array}
 * each one of those objects has id property the identifies it
 */
export class SyncCollection<T extends Entity<Record<any, any>>> {
    /**
     * 
     * @param {ISyncStorage} storage
     * @param {string} name 
     */
    constructor(
        private storage: ISyncStorage<T[]>,
        private name: string,
    ) { }

    private _create(entites: T[], entity: T | Omit<T, 'id'>) {
        addId(entity, hasId(entity) ? entity.id : undefined);
        entites.push(entity);
        this.update(entites);
        return entity;
    }

    private _put(entites: T[], entity: T, existance: Existance<T>) {
        entites[existance.index] = entity;
        this.update(entites);
        return entity;
    }

    private update(entites: T[]) {
        return this.storage.set(this.name, entites);
    }

    public create(entity: T | Omit<T, 'id'>): T {
        return this._create(this.getAll(), entity);
    }

    public put(entity: T): T | null {
        const entites = this.getAll();
        const exist = isItemExist(entites, entity.id);
        if (not(exist)) {
            return null;
        }
        return this._put(entites, entity, exist);
    }

    public set(entity: T) {
        const entites = this.getAll();
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

    /**
     * Delete an entity by id 
     * @param id of the entity
     * @returns the deleted entity or null if the id is not belong to any entity within the collection 
     */
    public delete(id: EntityId) {
        const entites = this.getAll();
        const exist = isItemExist(entites, id)
        if (not(exist)) {
            return null;
        }
        entites.splice(exist.index, 1);
        this.update(entites);
        return exist.entity;
    }

    /**
     * where like function to return the first element that matches the condition
     * @param queryCallback the where conditions to apply on the entire collection
     */
    public get(queryCallback: QueryCallback<T>) {
        const entites = this.getAll();
        return entites.find(queryCallback) || null;
    }

    /**
     * Get all collection entites
     * @throws {TypeError} if the collection is not of type array
     */
    public getAll(queryCallback?: QueryCallback<T>): T[] {
        const entites = this.storage.get(this.name) ?? [];
        if (Array.isArray(entites)) {
            return queryCallback ? entites.filter(queryCallback) : entites.slice(0);
        }
        throw new TypeError(`${ this.name } is not array type`);
    }

    /**
     * Clear out the entire collection
     */
    public clear(): void {
        this.storage.clear();
    }

}
