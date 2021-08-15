import { Entity, EntityId } from "./entity";

export const find = <T>(value: any, by: keyof T) => (obj: T) => obj[by] === value;

/**
 * @internal
 * @param items an array of object
 * @param id 
 */
export function isItemExist(items: Entity<any>[], id: EntityId) {
    const index = items.findIndex(find(id, 'id'));
    if (index > -1) {
        return {
            entity: items[index],
            index
        }
    }
    return null;
}

/**
 * Convert the givin value to boolean type
 */
export function not(value: any): value is null | undefined {
    return !!!value;
}

/**
 * Check if the `valus` is `null` or `undefiend`
 */
export function isNullOrUndefiend(value: any): value is null | undefined {
    return value === null || value === undefined;
}
/**
 * returns true if the context is browser
 */
export function isBrowser() {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

export function hasId<T>(value: T): value is Entity<any> {
    return 'id' in value;
}

export function addId<T>(value: T, id?: EntityId | null): asserts value is Entity<T> {
    Object.assign(value, { id: id ?? uniqueId() });
}


export function uniqueId() {
    return Date.now() + Math.ceil(Math.sqrt(Math.random()) * 1000);
}