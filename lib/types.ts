import { Entity } from "..";

export interface Storage {
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
