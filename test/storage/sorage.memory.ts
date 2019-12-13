import { InMemory } from "../../src/storage/storage.memory";

describe('#InMemory', () => {
    it('Should return null if entity not exist', () => {
        const storage = new InMemory();
        expect(storage.get('test')).toBeNull();
    });
    it('Should return the entity after store it ', () => {
        const storage = new InMemory();
        expect(storage.set('key', 'value')).toBe('value');
    });
    it('Should set the entity to null when invoking the delete function', () => {
        const storage = new InMemory();
        storage.set('key', 'value');
        storage.delete('key');
        expect(storage.get('key')).toBeNull();
    });
});
