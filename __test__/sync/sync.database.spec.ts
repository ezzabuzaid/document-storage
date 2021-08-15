import { SyncDatabase, Entity } from "../../src/index";
import { AsyncTodoStorage } from "../async_todo_storage";
import { SyncTodoStorage } from "../sync_todo_storage";
import { seedTodo, seedTodoAsync, Todo } from "../todo_seeder";

describe('SyncDatabase', () => {

    it('checks if a collection is exist', () => {
        // Arrange
        const database = new SyncDatabase(new AsyncTodoStorage());
        let actual, expected = false;

        // Act
        actual = database.has('test')

        // Assert
        expect(actual).toBe(expected);
    });

    it('adds collection to the collections list', () => {
        // Arrange
        const database = new SyncDatabase(new AsyncTodoStorage());
        database.collection('test');
        let actual, expected = true;

        // Act
        actual = database.has('test')

        // Assert
        expect(actual).toBe(expected);
    });

    it('clears all collections', () => {
        // Arrange
        const database = new SyncDatabase(new SyncTodoStorage());
        const firstCollection = database.collection<Entity<Todo>>('First');
        const secondCollection = database.collection<Entity<Todo>>('Second');
        seedTodo(firstCollection, 10);
        seedTodo(secondCollection, 10);
        let actual, expected = [[], []];

        // Act
        database.clear();
        actual = [firstCollection.getAll(), secondCollection.getAll()];

        // Assert
        expect(actual).toEqual(expected);
    });
});
