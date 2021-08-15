import { ISyncStorage, Entity } from "../src";
import { Todo } from "./todo_seeder";

export class SyncTodoStorage implements ISyncStorage<Entity<Todo>[]> {
    private todos: Record<string, Entity<Todo>[]> = {};

    get(name: string): Entity<Todo>[] {
        return this.todos[name];
    }
    clear(): void {
        this.todos = {};
    }
    set(name: string, value: Entity<Todo>[]): void {
        this.todos[name] = value;
    }
}
