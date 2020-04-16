export type Entity<T> = T & { readonly id: number };

/**
 * ISyncStorage store the the data within namespaces, each namespace have it's own method to deal and maniuplate the data like storing and reteriving
 * @param name of storage namespace
 */
export interface ISyncStorage {
    get<T>(name: string): T;
    clear(name: string): void;
    set<T>(name: string, value: T): void;
}

export interface IAsyncStorage {
    get<T>(name: string): Promise<Entity<T>[]>;
    clear(name: string): Promise<void>;
    set<T>(name: string, value: Entity<T>[]): Promise<void>;
}
