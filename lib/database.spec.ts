import { DatabaseService } from './database.service';
import { Collection } from './database-collection';
import { Entity } from '.';



describe('Database service', () => {
    let service: DatabaseService;
    let collection: Collection<Entity<{ name: string }>>;
    const COLLECTION_NAME = 'test_collection';
    let entity: Entity<{ name: string }>;
    beforeEach(() => {
        service = new DatabaseService();
        collection = service.collection(COLLECTION_NAME);
    });

    it(`Should create entity`, () => {
        entity = collection.create({ name: 'test' });
        expect(entity).toBeTruthy();
    });

    it('Entity Should be null if not exist', () => {
        const _entity = collection.put({ name: 'test', id: 10 });
        expect(_entity).toBeNull();
    });

    it('Should update entity', () => {
        const oldEntity = collection.put({ name: 'test2', id: entity.id });
        expect(oldEntity).not.toBeNull();
        expect(oldEntity.name).not.toBe('test2');
    });


    it('Should fetch entity', () => {
        const _entity = collection.getById(entity.id);
        expect(_entity).not.toBeNull();
        expect(_entity.name).toBe('test2');
    });

});
// TODO collection existance
// TODO database existance
