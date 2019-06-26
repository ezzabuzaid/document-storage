import { LocalStorage } from "./localstorage";

export class SessionStorage extends LocalStorage {
    constructor(name: string) {
        super(name);
        this.storage = sessionStorage;
    }

}
