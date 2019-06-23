const $window = (window as any);
$window.indexedDB = $window.indexedDB || $window.mozIndexedDB || $window.webkitIndexedDB || $window.msIndexedDB;
$window.IDBTransaction = $window.IDBTransaction || $window.webkitIDBTransaction || $window.msIDBTransaction || { READ_WRITE: 'readwrite' };
$window.IDBKeyRange = $window.IDBKeyRange || $window.webkitIDBKeyRange || $window.msIDBKeyRange;

export class IndexDB {
    private storage: typeof indexedDB = window.indexedDB;
    private databaseName: string = null;
    private version = 4;
    private database: IDBDatabase = null;
    private objectStoreName = null;

    constructor(name: string) {
        this.databaseName = name;
    }

    private openDB() {
        const request = this.storage.open(this.databaseName, this.version);
        request.addEventListener('success', () => {
            request.removeEventListener('success', () => {
                this.database = request.result
            });
        });

        request.addEventListener('error', () => { });

        request.addEventListener('upgradeneeded', ({ target }) => {
            // target['result']
        });
    }

    private transaction(name: string[], accsess: IDBTransactionMode) {
        return this.openDB().pipe(map((database) => database.transaction(name, accsess)));
    }

    objectStore(name = this.objectStoreName) {

        if (!name) {
            throw new Error('Please provide object store name by calling configure() or by used method');
        }

        // for each operation a transaction will be opened, consider workaround it
        return this.transaction([name], 'readwrite').pipe(map((data) => data.objectStore(name)));
    }

    configure(options: IndexDBConfiguration) {
        // if all the required is the object store you can pass it in [objectStore] method
        this.objectStoreName = options.objectStoreName;
    }

    /**
     *
     */
    populate({ name, version }: IndexDBPopulation) {
        this.databaseName = name;
        this.version = version;
        return this;
    }

    deleteItem(id: string, objectStoreName = this.objectStoreName) {
        this.objectStore(objectStoreName)
            .pipe(map(object => {
                return object.delete(id);
            }));
    }

    getItem(id: string, objectStoreName = this.objectStoreName) {
        this.objectStore(objectStoreName)
            .pipe(map(object => {
                return object.get(id);
            }));
    }

    updateItem(id, objectStoreName = this.objectStoreName) {
        this.objectStore(objectStoreName)
            .pipe(map(object => {
                return object.put(id);
            }));
    }

}

interface IndexDBConfiguration {
    objectStoreName: string;
}

interface IndexDBPopulation {
    name: string;
    version: number;

}
