import { AsyncCollection, AsyncStorage } from "../../src/index";
class Todo {
    constructor(public name: string) { }
}
describe('#AsyncCollection', () => {
    let collection: AsyncCollection<Todo>;
    let mockStorage: AsyncStorage;
    const COLLECTION_NAME = 'test';
    beforeEach(function () {
        const mockStorageFn = jest.fn<Partial<AsyncStorage>, any>((() => ({
            clear: jest.fn(),
            get: jest.fn().mockReturnValue([]),
            set: jest.fn()
        })));
        mockStorage = mockStorageFn() as AsyncStorage;
        collection = new AsyncCollection<Todo>(mockStorage, COLLECTION_NAME);
    });

    describe('[getAll]', () => {
        it('Should invoke the get method from the storage', async () => {
            await collection.getAll();
            expect(mockStorage.get).toBeCalledTimes(1);
            expect(mockStorage.get).toBeCalledWith(COLLECTION_NAME);
        });

        it('return empty list if the storage value is null or undefined', async () => {
            expect(await collection.getAll()).toEqual([]);
        });
    });

    describe('[delete]', () => {

        it('Should return null if the item is not exist', async () => {
            expect(await collection.delete(0)).toBeNull();
        });

        it('Should delete an entity', async () => {
            const todo = new Todo('test');
            const firstTodo = await collection.create(todo);
            const secondTodo = await collection.create(todo);
            const thirdTodo = await collection.create(todo);
            collection.delete(secondTodo.id);
            expect(await collection.getAll()).toEqual([firstTodo, secondTodo]);
        });

        it('Should return the entity after delete it', async () => {
            const rawTodo = new Todo('test');
            const todo = await collection.create(rawTodo)
            expect(await collection.delete(todo.id)).toBe(todo);
        });

    });

    describe('[create]', () => {

        it('Should invoke the set method from the storage', async () => {
            const todo = await collection.create({ name: 'todo-0' });
            expect(mockStorage.set).toBeCalledTimes(1);
            expect(mockStorage.set).toBeCalledWith(COLLECTION_NAME, [{ name: 'todo-0', id: todo.id }]);
        });

        it('Should increment the id to be unique', async () => {
            const firstTodo = await collection.create({ name: 'todo-1' });
            const todos = [firstTodo];
            expect(mockStorage.set).toBeCalledWith(COLLECTION_NAME, todos);

            todos.push(await collection.create({ name: 'todo-2' }));
            expect(mockStorage.set).toBeCalledWith(COLLECTION_NAME, todos);

            await collection.delete(firstTodo.id);
            todos.splice(0, 1);

            const rawTodo = { name: 'todo-3' };
            const todo = await collection.create(rawTodo);
            todos.push({ ...rawTodo, id: todo.id });
            expect(mockStorage.set).toBeCalledWith(COLLECTION_NAME, todos);
        });
    });

    describe('[set]', () => {

        it('Should create new entity if it does not exist', async () => {
            const rawTodo = new Todo('set');
            const createdTodo = await collection.set(rawTodo);
            expect(await collection.getAll()).toEqual([createdTodo]);
        });

        it('Should update the entity if it does exist', async () => {
            const rawTodo = new Todo('test');
            const createdTodo = await collection.create(rawTodo);
            createdTodo.name = 'Updated';
            const updatedTodo = collection.set(createdTodo);
            expect(collection.get((entity) => entity.id === createdTodo.id)).toEqual(updatedTodo);
        });

    });

    describe('[put]', () => {

        it('Should return null if the item is not exist', async () => {
            expect(await collection.put({ id: 0, name: '' })).toBeNull();
        });

        it('Should update an entity', async () => {
            const todo = new Todo('test');
            const createdTodo = await collection.create(todo);
            const updatedTodo = await collection.put(createdTodo);
            createdTodo.name = 'updated';
            expect(updatedTodo.name).toBe(createdTodo.name);
        });

        it('Should return the entity after update it', async () => {
            const todo = new Todo('test');
            const createdTodo = await collection.create(todo);
            const updatedTodo = await collection.put(createdTodo);
            expect(updatedTodo).toBeDefined();
        });

    });

    describe('[get]', () => {

        it('Should return null if the entity is not exist', async () => {
            expect(await collection.get((entity) => entity.id === 5)).toBeNull();
        });

        it('Should return an entity', async () => {
            const todo = new Todo('test');
            const createdTodo = await collection.create(todo);
            expect(await collection.get((entity) => entity.id === createdTodo.id)).toEqual(createdTodo);
        });
    });

    describe('[clear]', () => {

        it('Should invoke the clear method from storage', async () => {
            await collection.clear();
            expect(mockStorage.clear).toBeCalledTimes(1);
        });

    });
});
