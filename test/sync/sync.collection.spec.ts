import { SyncCollection, SyncStorage } from "../../src/index";
class Todo {
    constructor(public name: string) { }
}
describe('#SyncCollection', () => {
    let collection: SyncCollection<Todo>;
    let mockStorage: SyncStorage;
    const COLLECTION_NAME = 'test';
    beforeEach(function () {
        const mockStorageFn = jest.fn<Partial<SyncStorage>, any>((() => ({
            clear: jest.fn(),
            get: jest.fn().mockReturnValue([]),
            set: jest.fn()
        })));
        mockStorage = mockStorageFn() as SyncStorage;
        collection = new SyncCollection<Todo>(mockStorage, COLLECTION_NAME);
    });

    describe('[getAll]', () => {
        it('Should invoke the get method from the storage', () => {
            collection.getAll();
            expect(mockStorage.get).toBeCalledTimes(1);
            expect(mockStorage.get).toBeCalledWith(COLLECTION_NAME);
        });

        it('return empty list if the storage value is null or undefined', () => {
            expect(collection.getAll()).toEqual([]);
        });
    });

    describe('[delete]', () => {

        it('Should return null if the item is not exist', () => {
            expect(collection.delete(0)).toBeNull();
        });

        it('Should delete an entity', () => {
            const todo = new Todo('test');
            const firstTodo = collection.create(todo);
            const secondTodo = collection.create(todo);
            const thirdTodo = collection.create(todo);
            collection.delete(secondTodo.id);
            expect(collection.getAll()).toEqual([firstTodo, secondTodo]);
        });

        it('Should return the entity after delete it', () => {
            const todo = new Todo('test');
            collection.create(todo)
            expect(collection.delete(0)).toBe(todo);
        });

    });

    describe('[create]', () => {

        it('Should invoke the set method from the storage', () => {
            collection.create({ name: 'todo-0' });
            expect(mockStorage.set).toBeCalledTimes(1);
            expect(mockStorage.set).toBeCalledWith(COLLECTION_NAME, [{ name: 'todo-0', id: 0 }]);
        });

        it('Should increment the id to be unique', () => {
            const firstTodo = collection.create({ name: 'todo-1' });
            const todos = [firstTodo];
            expect(mockStorage.set).toBeCalledWith(COLLECTION_NAME, todos);

            todos.push(collection.create({ name: 'todo-2' }));
            expect(mockStorage.set).toBeCalledWith(COLLECTION_NAME, todos);

            collection.delete(firstTodo.id);
            todos.splice(0, 1);

            const rawTodo = { name: 'todo-3' };
            collection.create(rawTodo);
            todos.push({ ...rawTodo, id: 2 });
            expect(mockStorage.set).toBeCalledWith(COLLECTION_NAME, todos);
        });
    });

    describe('[set]', () => {

        it('Should create new entity if it does not exist', () => {
            const rawTodo = new Todo('set');
            const createdTodo = collection.set(rawTodo);
            expect(collection.getAll()).toEqual([createdTodo]);
        });

        it('Should update the entity if it does exist', () => {
            const rawTodo = new Todo('test');
            const createdTodo = collection.create(rawTodo);
            createdTodo.name = 'Updated';
            const updatedTodo = collection.set(createdTodo);
            expect(collection.get((entity) => entity.id === createdTodo.id)).toEqual(updatedTodo);
        });

    });

    describe('[put]', () => {

        it('Should return null if the item is not exist', () => {
            expect(collection.put({ id: 0, name: '' })).toBeNull();
        });

        it('Should update an entity', () => {
            const todo = new Todo('test');
            const createdTodo = collection.create(todo);
            const updatedTodo = collection.put(createdTodo);
            createdTodo.name = 'updated';
            expect(updatedTodo.name).toBe(createdTodo.name);
        });

        it('Should return the entity after update it', () => {
            const todo = new Todo('test');
            const createdTodo = collection.create(todo);
            const updatedTodo = collection.put(createdTodo);
            expect(updatedTodo).toBeDefined();
        });

    });

    describe('[get]', () => {

        it('Should return null if the entity is not exist', () => {
            expect(collection.get((entity) => entity.id === 5)).toBeNull();
        });

        it('Should return an entity', () => {
            const todo = new Todo('test');
            const createdTodo = collection.create(todo);
            expect(collection.get((entity) => entity.id === createdTodo.id)).toEqual(createdTodo);
        });
    });

    describe('[clear]', () => {

        it('Should invoke the clear method from storage', () => {
            collection.clear();
            expect(mockStorage.clear).toBeCalledTimes(1);
        });

    });
});
