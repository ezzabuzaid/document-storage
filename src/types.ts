export type Entity<T> = T & { readonly id: number };
export interface SyncStorage {
    get<T>(name: string): Entity<T>[];
    clear(): void;
    set<T>(name: string, value: any): Entity<T>;
}

export interface AsyncStorage {
    get<T>(name: string): Promise<Entity<T>[]>;
    clear(): Promise<void>;
    set<T>(name: string, value: Entity<T>[]): Promise<Entity<T>>;
}

