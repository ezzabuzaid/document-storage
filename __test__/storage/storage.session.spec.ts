import { SessionStorage } from "../../src/storage/storage.session";

describe('SessionStorage', () => {
    it("returns null if key doesn't exist", () => {
        // Arrange
        const storage = new SessionStorage();
        let actual, expected = null;

        // Act
        actual = storage.get('foo');

        // Assert
        expect(actual).toBe(expected);
    });

    it('stores and returns a value', () => {
        // Arrange
        const storage = new SessionStorage();
        let actual, expected = 'value';

        // Act
        storage.set('key', 'value');
        actual = storage.get('key');

        // Assert
        expect(actual).toEqual(expected);
    });

    it('returns the old value after override it', () => {
        // Arrange
        const storage = new SessionStorage();
        let actual, expected = 'value';

        // Act
        storage.set('key', 'value');
        actual = storage.set('key', 'value1');

        // Assert
        expect(actual).toEqual(expected);
    });

    it('returns the deleted value', () => {
        // Arrange
        const storage = new SessionStorage();
        let actual, expected = 'value';

        // Act
        storage.set('key', 'value');
        actual = storage.delete('key');

        expect(actual).toEqual(expected);
    });

    it('deletes a value', () => {
        // Arrange
        const storage = new SessionStorage();
        let actual, expected = null;


        // Act
        storage.set('key', 'value');
        storage.delete('key');
        actual = storage.get('key')

        expect(actual).toEqual(expected);
    });

    it('deletes the whole entries', () => {
        // Arrange
        const storage = new SessionStorage();
        let actual, expected = [null, null];

        // Act
        storage.set('key', 'value');
        storage.set('key2', 'value');
        storage.clear();
        actual = [storage.get('key'), storage.get('key2')];

        expect(actual).toEqual(expected);
    });
});
