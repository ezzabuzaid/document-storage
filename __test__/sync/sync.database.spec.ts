import { SyncDatabase, ISyncStorage, Database } from "../../src/index";

describe('#Sync Database', () => {
    const mockStorageFn = jest.fn<Partial<ISyncStorage>, any>((() => ({
        clear: jest.fn()
    })));
    const mockStorage = mockStorageFn() as ISyncStorage;

    const database = new SyncDatabase(mockStorage);
    it('should check if a collection is exist', () => {
        expect(database.has('test')).toBeFalsy();
    });

    it('should add collection to the collections list', () => {
        database.collection('test');
        expect(database.has('test')).toBeTruthy();
    });

    it('should clear out all data inside the collections', () => {
        database.collection('test');
        database.clear();
        expect(mockStorage.clear).toBeCalled();
    });
});
