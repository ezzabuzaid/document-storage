import { AsyncStorage } from "../types";

export class UserSettingsDataset implements AsyncStorage {

    private async http(name: string, method = 'GET', body = null) {
        const req = await fetch(`https://crm-dev.equiti.me.uk/custom/api/usersettings/${name}`, {
            method,
            body,
            headers: { Authorization: 'Bearer tkstqbra3of9sddk8njosl9666' }
        });
        return req.json();
    }

    constructor() { }

    public set<T>(name: string, value: any[]): Promise<T> {
        return this.http(name, 'POST', []);
    }

    public get<T>(name: string): Promise<T> {
        return this.http(name);
    }

    public async clear(name: string): Promise<void> {
        return this.http(name, 'POST', []);
    }

}