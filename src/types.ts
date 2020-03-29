export type Entity<T> = T & { readonly id: number };
export interface SyncStorage {
    get<T>(name: string): Entity<T>[];
    clear(name: string): void;
    set<T>(name: string, value: any): void;
}

export interface AsyncStorage {
    get<T>(name: string): Promise<Entity<T>[]>;
    clear(name: string): Promise<void>;
    set<T>(name: string, value: Entity<T>[]): Promise<void>;
}
