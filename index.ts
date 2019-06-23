export interface Storage {
    get: <T>(name: string) => T;
    delete: <T>(name: string) => T;
    clear: () => void;
    set: (name: string, value: any) => void;
}
export type Entity<T> = T & { readonly id: number };

export * from './lib/localstorage';
export * from './lib/indexdb';
export * from './lib/database';
export * from './lib/collection';
export * from './lib/provider';