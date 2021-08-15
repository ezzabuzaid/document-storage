import { isBrowser } from "../utils";
import { AbstractStorage } from "./abstract_storage";

declare var localStorage: Storage;

/**
 * LocalStorage is a wrapper around the native `browser localstorage` that offers the ability
 * to have `namespaces` within it
 * ```
 * const namespace1 = new LocalStorage('MyNamespace1');
 * const namespace2 = new LocalStorage('MyNamespace2');
 * namespace1.set('key', value);
 * namespace2.get('key') | returns null;
 * ```
 */
export class LocalStorage<T> extends AbstractStorage<T> {

  /**
   *
   * @param name name of storage namespace
   */
  constructor(
    public name = 'storage',
  ) {
    super(name, (() => {
      if (isBrowser()) {
        return localStorage;
      } else {
        throw new TypeError('localStorage is not supported in non browser env');
      }
    })())
  }

}
