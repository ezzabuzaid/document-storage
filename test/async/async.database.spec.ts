import { AsyncDatabase, AsyncStorage, Database } from "../../src/index";

describe('#AsyncDatabase', () => {
    const mockStorageFn = jest.fn<Partial<AsyncStorage>, any>((() => ({
        clear: jest.fn()
    })));
    const mockStorage = mockStorageFn() as AsyncStorage;

    const database = new AsyncDatabase(mockStorage);
    it('should check if a collection is exist', () => {
        expect(database.has('test')).toBeFalsy();
    });

    it('should add collection to the collections list', () => {
        database.collection('test');
        expect(database.has('test')).toBeTruthy();
    });

    it('should clear out all data inside the collections', async () => {
        database.collection('test');
        await database.clear();
        expect(mockStorage.clear).toBeCalled();
    });
});
