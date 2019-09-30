export type Entity<T> = T & { readonly id: number };
export interface SyncStorage {
    get<T>(name: string): T;
    delete<T>(name: string): T;
    clear(): void;
    set<T>(name: string, value: any): T;
}

export interface AsyncStorage {
    get<T>(name: string): Promise<T>;
    clear(name?: string): Promise<void>;
    set<T>(name: string, value: Entity<T>[]): Promise<T>;
}
