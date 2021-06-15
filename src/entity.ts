export type EntityId = string | number;

export type Entity<T> = T & {
    readonly id: EntityId;
};
