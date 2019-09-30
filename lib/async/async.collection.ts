import { find } from "../utils";
import { Entity } from "../..";
import {  AsyncStorage } from "../types";
export class AsyncCollection<T> {

    constructor(
        private storage: AsyncStorage,
        private name: string,
    ) { }

    private update(cursor: Entity<T>[]) {
        this.storage.set(this.name, cursor);
    }

    private isExist(cursor: Entity<T>[], id: number) {
        return cursor.find(find(id, 'id')) || null;
    }

    private async  create(entity: T): Promise<Entity<T>> {
        const _entity = entity as Entity<T>;
        const cursor = await this.cursor();
        _entity['id' as any] = cursor.length;
        cursor.push(_entity);
        await this.update(cursor);
        return _entity;
    }

    private async  put(entity: T): Promise<Entity<T>> {
        const _entity = entity as Entity<T>;
        const cursor = await this.cursor();
        if (!this.isExist(cursor, _entity.id)) {
            return null;
        }
        const oldEntity = cursor[_entity.id];
        cursor[_entity.id] = entity as any;
        await this.update(cursor);
        return oldEntity;
    }

    public async delete(id: number): Promise<Entity<T>> {
        const cursor = await this.cursor();
        const entity = this.isExist(cursor, id)
        if (!entity) {
            return null;
        }
        cursor.splice(id, 1);
        await this.update(cursor);
        return entity;
    }

    public async set(entity: T): Promise<Entity<T>> {
        return this.put(entity) || this.create(entity);
    }

    public async get(queryCallback: (object: Entity<T>) => boolean) {
        const cursor = await this.cursor();
        return cursor.find(queryCallback);
    }

    public async cursor() {
        return (await this.storage.get<Entity<T>[]>(this.name)) || [];
    }

    public async clear() {
        return this.storage.clear(this.name);
    }
}
