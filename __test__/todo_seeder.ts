import { AsyncCollection, Entity, SyncCollection } from "../src";
import { uniqueId } from "../src/utils";

export class Todo {
    constructor(public name: string) { }
}

export function makeTodos(length: number) {
    return Array.from({ length: length }, () => {
        const todoName = String(uniqueId());
        return new Todo(todoName);
    });
}

export async function seedTodoAsync(collection: AsyncCollection<Entity<Todo>>, length: number): Promise<Entity<Todo>[]> {
    const todos: Entity<Todo>[] = [];
    for (const todo of makeTodos(length)) {
        todos.push(await collection.create(todo));
    }
    return todos;
}

export function seedTodo(collection: SyncCollection<Entity<Todo>>, length: number): Entity<Todo>[] {
    const todos: Entity<Todo>[] = [];
    for (const todo of makeTodos(length)) {
        todos.push(collection.create(todo));
    }
    return todos;
}
