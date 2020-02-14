import { LocalStorage } from "./storage.localstorage";
import { isBrowser } from "../utils";

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

    constructor(
        public name = 'storage',
    ) {
        super(name);
    }
}
