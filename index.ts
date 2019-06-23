export interface Storage {
    get: <T>(name: string) => T;
    remove: <T>(name: string) => T;
    set: (name: string, value: any) => void;
    clear: (name: string) => void;
}
export type Entity<T> = T & { readonly id: number };

export * from './lib/localstorage';
export * from './lib/indexdb';
export * from './lib/database';
export * from './lib/collection';
export * from './lib/provider';