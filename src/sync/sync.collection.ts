import { isItemExist, not, isNullOrUndefiend } from "../utils";
import { SyncStorage, Entity } from "../types";

export class SyncCollection<T> {

    constructor(
        private storage: SyncStorage,
        private name: string,
    ) { }

    private _create(entites: Entity<T>[], entity: T) {
        entity['id' as any] = Date.now();
        entites.push(entity as Entity<T>);
        this.update(entites);
        return entity as Entity<T>;
    }

    private _put(entites: Entity<T>[], entity: Entity<T>, existance: ReturnType<typeof isItemExist>) {
        entites[existance.index] = entity;
        this.update(entites);
        return entity;
    }

    private update(entites: Entity<T>[]) {
        return this.storage.set<T>(this.name, entites);
    }

    public create(entity: T): Entity<T> {
        return this._create(this.getAll(), entity);
    }

    public put(entity: Entity<T>): Entity<T> {
        const entites = this.getAll();
        const exist = isItemExist(entites, entity.id);
        if (not(exist)) {
            return null;
        }
        return this._put(entites, entity, exist);
    }

    public set(entity: T) {
        const entites = this.getAll();
        const id = entity['id'];
        if (not(isNullOrUndefiend(id))) {
            const exist = isItemExist(entites, id);
            if (not(exist)) {
                entity['id'] = null;
                this.set(entity);
            } else {
                return this._put(entites, entity as Entity<T>, exist);
            }
        } else {
            return this._create(entites, entity);
        }
    }

    public delete(id: number): Entity<T> {
        const entites = this.getAll();
        const exist = isItemExist(entites, id)
        if (not(exist)) {
            return null;
        }
        entites.splice(exist.index, 1);
        this.update(entites);
        return exist.entity;
    }

    public get(queryCallback: (object: Entity<T>) => boolean) {
        const entites = this.getAll();
        return entites.find(queryCallback) || null;
    }

    public getAll() {
        return this.storage.get<T>(this.name) || [];
    }

    public clear() {
        this.storage.clear(this.name);
    }

}
