import { LocalStorage } from "./storage.localstorage";
import { isBrowser } from "../utils";

/**
 * SessionStorage is a wrapper around the native `browser sessionstorage` that offers the ability
 * to have `namespaces` within it
 * ```
 * const namespace1 = new SessionStorage('MyNamespace1');
 * const namespace2 = new SessionStorage('MyNamespace2');
 * namespace1.set('key', value);
 * namespace2.get('key') | returns null;
 * ```
 */
export class SessionStorage extends LocalStorage {

    public get storage() {
        if (isBrowser()) {
            return this._storage || sessionStorage;
        } else if (this._storage) {
            return this._storage;
        } else {
            throw new TypeError('sessionStorage is not supported in non browser env');
        }
    }

    public set storage(value) {
        this._storage = value;
    }

    /**
     * 
     * @param name name of storage namespace
     */
    constructor(
        public name = 'storage',
    ) {
        super(name);
    }
}

