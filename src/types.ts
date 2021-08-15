import { Entity } from "./entity";

export interface Existance<T> {
    entity: Entity<T>;
    index: number;
}

/**
 * Store the the data within namespaces, each namespace have it's own method to deal and maniuplate the data like storing and retrieving
 * 
 * @param name storage namespace
 */
export interface ISyncStorage<T> {
    get(name: string): T;
    clear(): void;
    set(name: string, value: T): void;
}

export interface IAsyncStorage<T> {
    get(name: string): Promise<T>;
    clear(): Promise<void>;
    set(name: string, value: T): Promise<void>;
}

export type QueryCallback<T> = (object: T, index: number) => boolean;
