export interface Storage {
    get<T>(name: string): T;
    delete<T>(name: string): T;
    clear(): void;
    set<T>(name: string, value: any): T;
}

export interface AsyncStorage {
    get<T>(name: string): Promise<T>;
    delete<T>(name: string): Promise<T>;
    clear(): Promise<void>;
    set<T>(name: string, value: any): Promise<T>;
}


export type Entity<T> = T & { readonly id: number };

export * from './lib/localstorage';
export * from './lib/indexdb';
export * from './lib/database';
export * from './lib/collection';
export * from './lib/provider';

// TODO setup indexdb status { success, error, blocked }
// TODO connect with firebase example