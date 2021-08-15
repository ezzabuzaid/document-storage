import { IAsyncStorage, Entity } from "../src";
import { Todo } from "./todo_seeder";

export class AsyncTodoStorage implements IAsyncStorage<Entity<Todo>[]> {
    private todos: Record<string, Entity<Todo>[]> = {};

    async get(name: string): Promise<Entity<Todo>[]> {
        return this.todos[name];
    }
    async clear(): Promise<void> {
        this.todos = {};
    }
    async set(name: string, value: Entity<Todo>[]): Promise<void> {
        this.todos[name] = value;
    }
}
