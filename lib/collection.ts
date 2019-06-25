import { Storage, Entity } from '..';
import { find } from './utils';

export class Collection<T> {

    constructor(
        private storage: Storage,
        private name: string,
    ) { }

    private update(cursor) {
        this.storage.set(this.name, cursor);
    }

    private entityExisit(cursor: Entity<T>[], id: number) {
        return cursor.find(find(id, 'id')) || null;
    }

    create(entity: T): Entity<T> {
        const _entity = entity as Entity<T>;
        const cursor = this.cursor();
        _entity['id' as any] = cursor.length;
        cursor.push(_entity);
        this.update(cursor);
        return _entity;
    }

    put(entity: T): Entity<T> {
        const _entity = entity as Entity<T>;
        const cursor = this.cursor();
        if (!this.entityExisit(cursor, _entity.id)) {
            return null;
        }
        const oldEntity = cursor[_entity.id];
        cursor[_entity['id'] ] = entity as any;
        this.update(cursor);
        return oldEntity;
    }

    delete(id: number): Entity<T> {
        const cursor = this.cursor();
        const entity = this.entityExisit(cursor, id)
        if (!entity) {
            return null;
        }
        cursor.splice(id, 1);
        this.update(cursor);
        return entity;
    }

    set(entity: T): Entity<T> {
        return this.put(entity) || this.create(entity);
    }

    cursor() {
        return this.storage.get<Entity<T>[]>(this.name) || [];
    }

    where(queryCallback: (object: Entity<T>) => boolean) {
        const cursor = this.cursor();
        return cursor.find(queryCallback);
    }

    get(by: keyof T, value: any) {
        const cursor = this.cursor();
        return cursor.find(find(value, by as string));
    }

    clear() {
        this.storage.clear();
    }

}
