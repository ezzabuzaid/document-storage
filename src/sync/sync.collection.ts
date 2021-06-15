import { Existance, ISyncStorage } from "../types";
import { addId, hasId, isItemExist, isNullOrUndefiend, not } from "../utils";
import { Entity, EntityId } from "../entity";

/**
 * 
 * Collection is a set of objects collected in @type {Array}
 * each one of those objects has id property the identifies it
 */
export class SyncCollection<T> {
    /**
     * 
     * @param {ISyncStorage} storage
     * @param {string} name 
     */
    constructor(
        private storage: ISyncStorage,
        private name: string,
    ) { }

    private _create(entites: Entity<T>[], entity: T | Entity<T>) {
        addId(entity, hasId(entity) ? entity.id : undefined);
        entites.push(entity as Entity<T>);
        this.update(entites);
        return entity as Entity<T>;
    }

    private _put(entites: Entity<T>[], entity: Entity<T>, existance: Existance<T>) {
        entites[existance.index] = entity;
        this.update(entites);
        return entity;
    }

    private update(entites: Entity<T>[]) {
        return this.storage.set<T>(this.name, entites as any);
    }

    public create(entity: T): Entity<T> {
        return this._create(this.getAll(), entity);
    }

    public put(entity: Entity<T>): Entity<T> | null {
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
                addId(entity, null);
                this.set(entity);
            } else {
                return this._put(entites, entity, exist);
            }
        } else {
            return this._create(entites, entity);
        }
    }

    /**
     * Delete an entity by specifing its id 
     * @param id of the entity
     * @returns the deleted entity or null if the id is not belong to any entity within the collection 
     */
    public delete(id: EntityId): Entity<T> | null {
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
    public get(queryCallback: (object: Entity<T>) => boolean) {
        const entites = this.getAll();
        return entites.find(queryCallback) || null;
    }

    /**
     * Get all collection entites
     * @throws {TypeError} if the collection is not of type array
     */
    public getAll(): Entity<T>[] {
        const entites = this.storage.get<T>(this.name);
        if (Array.isArray(entites)) {
            return entites;
        }
        if (isNullOrUndefiend(entites)) {
            return [] as Entity<T>[];
        }
        throw new TypeError(`${ this.name } is not array type`);
    }

    /**
     * Clear out the entire collection
     */
    public clear(): void {
        this.storage.clear(this.name);
    }

}
