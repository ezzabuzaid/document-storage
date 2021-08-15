import { AsyncCollection, Entity } from "../../src/index";
import { uniqueId } from "../../src/utils";
import { AsyncTodoStorage } from "../async_todo_storage";
import { makeTodos, seedTodoAsync, Todo } from "../todo_seeder";


describe('AsyncCollection', () => {

    describe('[getAll]', () => {
        it('returns entire collection entities', async () => {
            // Arrange
            const collection = makeCollection();
            const actualTodos = makeTodos(50);
            let expectedTodos;

            // Act
            for (const todo of actualTodos) {
                await collection.create(todo);
            }
            expectedTodos = await collection.getAll();

            // Asserts
            expect(actualTodos).toEqual(expectedTodos)
        });

        it('returns empty list if the storage value is null or undefined', async () => {
            // Arrange
            const collection = makeCollection();
            const actualData: any[] = [];
            let expectedData;

            // Act
            expectedData = await collection.getAll();

            // Assert
            expect(actualData).toEqual(expectedData);
        });
    });

    describe('[delete]', () => {

        it('returns null if the item is not exist', async () => {
            // Arrange
            const collection = makeCollection();
            let actual = null;
            let expected;

            // Act
            expected = await collection.delete(0);

            // Assert
            expect(actual).toBe(expected);
        });

        it('deletes an entity', async () => {
            // Arrange
            const collection = makeCollection();
            await seedTodoAsync(collection, 10);

            const actualTodos = (await collection.getAll()).slice(0, 9);
            let expectedTodos: Entity<Todo>[];


            // Act
            const toBeDeletedTodo = await collection.get((_, index) => index === 9);
            await collection.delete(toBeDeletedTodo!.id);
            expectedTodos = await collection.getAll();

            // Assert
            expect(expectedTodos).toEqual(actualTodos);
        });

        it('returns the entity after delete it', async () => {
            // Arrange
            const collection = makeCollection();
            const actualTodo = await collection.create(makeTodos(1)[0])
            let expectedTodo = null;

            // Act
            expectedTodo = await collection.delete(actualTodo.id)
            // Assert
            expect(expectedTodo).toEqual(actualTodo);
        });

    });

    describe('[create]', () => {

        it('creates an entity', async () => {
            // Arrange
            const collection = makeCollection();
            const actualTodo = new Todo('WriteUnitTest');
            let expectedTodo;

            // Act
            await collection.create(actualTodo);
            expectedTodo = await collection.get((todo) => todo.name === actualTodo.name);

            // Assert
            expect(actualTodo).toEqual(expectedTodo);
        });

        it('uses exiting entity id if found', async () => {
            // Arrange
            const collection = makeCollection();
            const customId = uniqueId();
            const actualEntity: Entity<Todo> = {
                id: customId,
                ...new Todo('WriteUnitTest')
            };
            let expectedEntity;

            // Act
            await collection.create(actualEntity);
            expectedEntity = await collection.get((todo) => todo.id === customId);

            // Assert
            expect(actualEntity).toEqual(expectedEntity);
        });

        it('generates id in case not defined', async () => {
            // Arrange
            const collection = makeCollection();
            const todo = new Todo('WriteUnitTest');

            // Act
            await collection.create(todo);
            const entity = await collection.get((todo) => todo.name === todo.name);

            // Assert
            expect(entity!.id).toBeDefined();
        });

    });

    describe('[set]', () => {

        it('creates new entity if it does not exist', async () => {
            // Arrange
            const collection = makeCollection();
            let actualEntity = {
                id: uniqueId(),
                ...new Todo('TestTodo')
            };
            let expectedEntity;

            // Act
            await collection.set(actualEntity);
            expectedEntity = await collection.get(entity => entity.id === actualEntity.id);

            // Assert
            expect(actualEntity).toEqual(expectedEntity);
        });

        it('updates an entity if it does exist', async () => {
            // Arrange
            const collection = makeCollection();
            const newTodoName = 'AfterUpdate';

            let entityToBeUpdated = (await seedTodoAsync(collection, 1))[0];
            const actualEntity = { ...entityToBeUpdated, name: newTodoName };
            let expectedEntity: Entity<Todo>;

            // Act
            await collection.set(actualEntity);
            const entites = await collection.getAll(entity => entity.id === actualEntity.id);
            expectedEntity = entites[0];

            // Assert
            expect(entites.length).toEqual(1);
            expect(actualEntity).toEqual(expectedEntity);
        });

    });

    describe('[put]', () => {

        it('returns null if the entity is not exist', async () => {
            // Arrange
            const collection = makeCollection();
            const todoEntity = { id: uniqueId(), ...new Todo('TestName') };
            const actual = null;
            let expected;

            // Act
            expected = await collection.put(todoEntity);

            // Assert
            expect(actual).toBe(expected);
        });

        it('updates an entity', async () => {
            // Arrange
            const collection = makeCollection();
            let entityToBeUpdated = (await seedTodoAsync(collection, 1))[0];
            const newTodoName = 'AfterUpdate';
            const actualEntity = { ...entityToBeUpdated, name: newTodoName };
            let expectedEntity: Entity<Todo>;

            // Act
            await collection.put(actualEntity);
            const entites = await collection.getAll(entity => entity.id === actualEntity.id);
            expectedEntity = entites[0];

            expect(entites.length).toEqual(1);
            expect(actualEntity).toEqual(expectedEntity);
        });

        it('returns the entity after update it', async () => {
            // Arrange
            const collection = makeCollection();
            let entityToBeUpdated = (await seedTodoAsync(collection, 1))[0];
            const newTodoName = 'AfterUpdate';
            const actualEntity = { ...entityToBeUpdated, name: newTodoName };
            let expectedEntity: Entity<Todo> | null;

            // Act
            expectedEntity = await collection.put(actualEntity);

            expect(actualEntity).toEqual(expectedEntity);
        });

    });

    describe('[get]', () => {

        it('returns null if the entity does not not exist', async () => {
            // Arrange
            const collection = makeCollection();
            let actualTodo = null;
            let expectedTodo;

            // Act
            expectedTodo = await collection.get((entity) => entity.id === 0);

            // Assert
            expect(actualTodo).toBe(expectedTodo);
        });

        it('returns an entity', async () => {
            // Arrange
            const collection = makeCollection();
            let actualEntity = (await seedTodoAsync(collection, 1))[0];
            let expectedEntity;

            // Act
            expectedEntity = await collection.get((entity) => entity.id === actualEntity.id);

            // Assert
            expect(actualEntity).toEqual(expectedEntity);
        });
    });

    describe('[clear]', () => {

        it('clears the entire collection', async () => {
            // Arrange
            const collection = makeCollection();
            await seedTodoAsync(collection, 10);
            const actualTodos: Entity<Todo>[] = [];
            let expectedTodos;

            // Act
            await collection.clear();
            expectedTodos = await collection.getAll();

            // Assert
            expect(actualTodos).toEqual(expectedTodos);
        });

    });
});


function makeCollection() {
    const storage = new AsyncTodoStorage();
    const collection = new AsyncCollection<Entity<Todo>>(storage, 'TodayTodos');
    return collection;
}