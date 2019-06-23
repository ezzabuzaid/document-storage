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

    create(entity: Entity<T>): Entity<T> {
        const cursor = this.cursor();
        entity['id' as any] = cursor.length;
        cursor.push(entity);
        this.update(cursor);
        return entity;
    }

    put(entity: Entity<T>): Entity<T> {
        const cursor = this.cursor();
        if (!this.entityExisit(cursor, entity.id)) {
            return null;
        }
        const oldEntity = cursor[entity.id];
        cursor[entity.id] = entity;
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

    set(entity: Entity<T>): Entity<T> {
        return this.put(entity) || this.create(entity);
    }

    cursor() {
        return this.storage.get<Entity<T>[]>(this.name) || [];
    }

    where(queryCallback: (object: Entity<T>) => boolean) {
        const cursor = this.cursor();
        return cursor.find(queryCallback);
    }

    get(by: string, value: any) {
        const cursor = this.cursor();
        return cursor.find(find(value, by));
    }

    clear() {
        this.storage.clear();
    }

}
