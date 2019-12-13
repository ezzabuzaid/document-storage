import { find, isItemExist, not, isNullOrUndefiend } from "../utils";
import { SyncStorage, Entity } from "../types";

export class Collection<T> {

    constructor(
        private storage: SyncStorage,
        private name: string,
    ) { }

    private _create(entites: Entity<T>[], entity: T) {
        const id = Math.max(...entites.map(entity => +entity.id))
        entity['id' as any] = id < 0 ? 0 : id + 1;
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
        this.storage.set(this.name, entites);
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
            console.log('CREAET');
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

    public getAll() {
        return this.storage.get<Entity<T>[]>(this.name) || [];
    }

    public get(queryCallback: (object: Entity<T>) => boolean) {
        const entites = this.getAll();
        return entites.find(queryCallback) || null;
    }

    public clear() {
        this.storage.clear();
    }

}
