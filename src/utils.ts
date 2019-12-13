export const find = (value: any, by: string) => obj => obj[by] === value;



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


export function not(value: any) {
    return !!!value;
}

export function isNullOrUndefiend(value: any) {
    return value === null && value === undefined;
}