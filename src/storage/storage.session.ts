import { isBrowser } from "../utils";
import { AbstractStorage } from "./abstract_storage";

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
export class SessionStorage<T> extends AbstractStorage<T> {

    /**
     *
     * @param name name of storage namespace
     */
    constructor(
        public name = 'storage',
    ) {
        super(name, (() => {
            if (isBrowser()) {
                return sessionStorage;
            } else {
                throw new TypeError('sessionStorage is not supported in non browser env');
            }
        })())
    }

}

