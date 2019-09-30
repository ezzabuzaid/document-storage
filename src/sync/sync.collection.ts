import { find } from "../utils";
import { SyncStorage, Entity } from "../types";

export class Collection<T> {

    constructor(
        private storage: SyncStorage,
        private name: string,
    ) { }

    private update(entites) {
        this.storage.set(this.name, entites);
    }

    private isExist(entites: Entity<T>[], id: number) {
        return entites.find(find(id, 'id')) || null;
    }

    create(entity: T): Entity<T> {
        const _entity = entity as Entity<T>;
        const entites = this.getAll();
        _entity['id' as any] = entites.length;
        entites.push(_entity);
        this.update(entites);
        return _entity;
    }

    put(entity: T): Entity<T> {
        const _entity = entity as Entity<T>;
        const entites = this.getAll();
        if (!this.isExist(entites, _entity.id)) {
            return null;
        }
        const oldEntity = entites[_entity.id];
        entites[_entity['id'] ] = entity as any;
        this.update(entites);
        return oldEntity;
    }

    delete(id: number): Entity<T> {
        const entites = this.getAll();
        const entity = this.isExist(entites, id)
        if (!entity) {
            return null;
        }
        entites.splice(id, 1);
        this.update(entites);
        return entity;
    }

    set(entity: T): Entity<T> {
        return this.put(entity) || this.create(entity);
    }

    getAll() {
        return this.storage.get<Entity<T>[]>(this.name) || [];
    }

    where(queryCallback: (object: Entity<T>) => boolean) {
        const entites = this.getAll();
        return entites.find(queryCallback);
    }

    get(by: keyof T, value: any) {
        const entites = this.getAll();
        return entites.find(find(value, by as string));
    }

    clear() {
        this.storage.clear();
    }

}
