export const find = (value: any, by: string) => obj => obj[by] === value;

/**
 * @internal
 * @param items an array of object
 * @param id 
 */
export function isItemExist<T>(items: T[], id: number) {
    const index = items.findIndex(find(+id, 'id'));
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
export function not(value: any) {
    return !!!value;
}

/**
 * Check if the `valus` is `null` or `undefiend`
 */
export function isNullOrUndefiend(value: any) {
    return value === null || value === undefined;
}
/**
 * returns true if the context is browser
 */
export function isBrowser() {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}