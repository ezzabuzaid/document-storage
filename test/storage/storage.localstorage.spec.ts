import { LocalStorage } from "../../src/storage/storage.localstorage";

describe('#LocalStorage', () => {
    let localStorage: LocalStorage;
    beforeEach(function () {
        localStorage = new LocalStorage();
    });

    it("should returns null if requested item doesn't exist", () => {
        const foo = localStorage.get('foo');
        expect(foo).toBeNull();
    });

    it('should sets the value of an item', () => {
        localStorage.set('foo', 'bar');
        expect(localStorage.dataSet()).toEqual({ foo: 'bar' });
    });

    it('should returns the old value after override it', () => {
        localStorage.set('foo', 'bar');
        expect(localStorage.set('foo', 'baz')).toEqual('bar');
    });

    it('should gets the value of an item', () => {
        localStorage.set('foo', 'bar');
        const foo = localStorage.get('foo');
        expect(foo).toBe('bar');
    });

    it('should removes an item', () => {
        localStorage.set('foo', 'bar');
        localStorage.delete('foo');
        const foo = localStorage.get('foo');
        expect(foo).toBeNull();
    });

    it('should retunrs the item after remove it', () => {
        localStorage.set('foo', 'bar');
        expect(localStorage.delete('foo')).toBe('bar');
    });

    it('should clears all items', () => {
        localStorage.set('foo', 'qwerty');
        localStorage.set('bar', 'asdf');
        expect(localStorage.dataSet()).toEqual({ foo: 'qwerty', bar: 'asdf' });
        localStorage.clear();
        expect(localStorage.dataSet()).toEqual({});
    });
});
