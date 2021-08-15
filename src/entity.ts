export type EntityId<Type = number> = Type;

export type Entity<T, IdType = number> = T & {
    readonly id: EntityId<IdType>;
};
