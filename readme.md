# A faciliteated way to maniplaute objects

  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ezzabuzaid/document-storage/pulls) [![Downloads per month](https://flat.badgen.net/npm/dm/@ezzabuzaid/document-storage)](https://www.npmjs.com/package/@ezzabuzaid/document-storage) [![Version](https://flat.badgen.net/npm/v/@ezzabuzaid/document-storage)](https://www.npmjs.com/package/@ezzabuzaid/document-storage) [![License](https://flat.badgen.net/npm/license/@ezzabuzaid/document-storage)](https://www.npmjs.com/package/@ezzabuzaid/document-storage) 

![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)

Don't forgot to follow the project's author, [Ezz](https://github.com/ezzabuzaid), and consider starring the project to show your ❤️ and support.

## Idea and Purpose

Imagine that you're working on an application that required to use browser storages depends on browser support, data amount, or a case that required to choose storage on runtime.

You're frequently changing your backend service and for a reason, you want to switch from firebase to another cool thing, and a problem arise where you afraid from changing due to different functionality, ...etc.

Facilitate the way to sync the data from the browser storage (WebSql, IndexDB) to the server either in Web worker or in the default browser context.

### Here We Go

> (write once and change without worry)

---
How to think of it!
*you have a key value pairs object and you want to treat it as model where you can save, update, retrive and delete the data from.*

## Api's

### Storages

* Sync storages
  1. Local storage
  2. Session storage
  3. In Memory storage ( simple plain object {} )

* Async storages
  1. IndexedDB (using idb)
  2. KeyValue store (idb-keyval)

### Database Api's

``` typescript

1. database.collection(string name); // fetch the collection if exist or create new one
2. database.clear(); // clear out the entire database

```

### Collection Api's

``` typescript

3. collection.create(T obj) // store POJO and patch auto increment id as number
4. collection.update(Entity < T > entity) // replace the old Entity object with new Entity Object
5. collection.delete(number id) // delete and entity object using it's id
6. collection.set(Entity < T > entity) // replace an entity if exist or create new one
7. collection.clear() // clear out the entire collection
8. collection.get((T entity, number index) => boolean) // query for a specific entity and return the first match

```

### Usage

#### SyncDatabase

First kind of database that implements the blocking operation like `LocalStorage` 

``` typescript
const pojo = {
    name: 'MyName',
    age: 10
};
const db = new SyncDatabase(new Localstorage('MyStorage'))
const collection = db.collection('MyCollection');
const entity = collection.create(pojo);
collection.delete(entity.id);
```

#### AsyncDatabase

Second kind of database that implements the non-blocking operation like `IndexedDB` , `Http` and any Storage that doesn't block the execution  

``` typescript
const pojo = {
    name: 'MyName',
    age: 10
};
const db = new AsyncDatabase(new IndexDB('MyObjectStore'));
const collection = db.collection('MyCollection');
const entity = await collection.create(pojo);
await collection.delete(entity.id);
```

#### Custom Storage

In order to use custom storage all that you need is to Implement the either the `IAsyncStorage` interface or `ISyncStorage` depends on your needs

``` typescript
class BackendStorage implements IAsyncStorage {
  get<T>(name: string): Promise<Entity<T>> {
    return fetch( `url/${name}` )
      .then(res => res.json());
  }
  clear(name?: string): Promise<void> {
    return fetch( `url/${name}` , {
      method: 'POST',
      body: JSON.stringify([])
    })
      .then(res => res.json());
  }
  set<T>(name: string, value: Entity<T>[]): Promise<void> {
    return fetch( `url/${name}` , {
      method: 'POST',
      body: JSON.stringify(value)
    })
      .then(res => res.json());
  }
}

const database = new AsyncDatabase(new BackendStorage());
const collection = database.collection('MyCollection');
```

please note that the `url/${name}` **name** part is the collection name

#### Standalone instantiating

Up until now, you learned how to use the offered **Storages** with **Database** and how we can store multiple collections within each storage
but what if you just want to deal with **LocalStorage** directly or **InMemoryStorage**!
All storages implement ISyncStorage, therefore, the offered API's are the same

``` typescript
const storage = new Storage('NameSpace');
storage.set('myKey', [{}]) // save the [{}] inside the localstorage;
storage.get('myKey') // retrieve the associated value from localstorage.NameSpace
storage.delete('myKey') // delete the associated value
storage.clear(); // clear out the entire NameSpace
```

##### Framework integration

* Angular

Angular uses a dependency injection framework to handle instances instantiating so we need to adhere to that way in order to get the same instance from the root module
**Note**: lazy loading modules working differently which implies that lazyloaded module instances are different from eager modules instances

``` typescript
providers: [
  {
    provide:  LocalStorage,
    useValue:  new  LocalStorage('StorageName'),
  },
  {
    provide:  SessionStorage,
    useValue:  new  SessionStorage('StorageName'),
  }
]
```

**SSR** will required additional setup by the way since LocalStorage, SessionStorage not available in server side

## Worthnote

Should you use this library?
I think the above reasons are not desired all of this, 
in general, overengineer the code is a bad thing, so you really need to think twice before immediately digging with it.

## Summary

1. This library built on top of typescript so it's fully supported for types,
2. The only way to install through npm (NO CDN).
3. It could be used in Node Js since it's plain functions and objects nothing related to a browser unless you decided to use browser things.
4. Entity! just a fancy name.

## Contributing

Don't hesitate to open issues and make a pull request to help improve code

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature` 
3. Commit your changes: `git commit -m 'Add some feature'` 
4. Push to the branch: `git push origin my-new-feature` 
5. Submit a pull request :D

## Versioning

This library will be maintained under the semantic versioning guidelines.
Releases will be numbered with the following format:
`<major>.<minor>.<patch>` 
For more information on SemVer, please visit [semver](http://semver.org).

## Developer

##### [Ezzabuzaid](mailto:ezzabuzaid@hotmail.com)

* [GitHub](https://github.com/ezzabuzaid)
* [Linkedin](https://www.linkedin.com/in/ezzabuzaid)

## License

##### The MIT License (MIT)

### TODO

* Support transactions
* Better error handling
* Limit collection size

# Built with love <3
