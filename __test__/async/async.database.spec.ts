import { AsyncDatabase, Entity } from "../../src/index";
import { AsyncTodoStorage } from "../async_todo_storage";
import { seedTodoAsync, Todo } from "../todo_seeder";

describe('AsyncDatabase', () => {

    it('checks if a collection is exist', () => {
        // Arrange
        const database = new AsyncDatabase(new AsyncTodoStorage());
        let actual, expected = false;

        // Act
        actual = database.has('test')

        // Assert
        expect(actual).toBe(expected);
    });

    it('adds collection to the collections list', () => {
        // Arrange
        const database = new AsyncDatabase(new AsyncTodoStorage());
        database.collection('test');
        let actual, expected = true;

        // Act
        actual = database.has('test')

        // Assert
        expect(actual).toBe(expected);
    });

    it('clears all collections', async () => {
        // Arrange
        const database = new AsyncDatabase(new AsyncTodoStorage());
        const firstCollection = database.collection<Entity<Todo>>('First');
        const secondCollection = database.collection<Entity<Todo>>('Second');
        await seedTodoAsync(firstCollection, 10);
        await seedTodoAsync(secondCollection, 10);
        let actual, expected = [[], []];

        // Act
        await database.clear();
        actual = [await firstCollection.getAll(), await secondCollection.getAll()];

        // Assert
        expect(actual).toEqual(expected);
    });
});
