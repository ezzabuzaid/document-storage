---
title: Document Storage documentation
author: Ezzabuzaid
tags: 'Storage, Browser storage, indexeddb, odm,'

---

<h1 id="a-faciliteated-way-to-maniplaute-objects">A faciliteated way to maniplaute objects</h1>
<p><a href="https://github.com/ezzabuzaid/document-storage/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a> <a href="https://www.npmjs.com/package/@ezzabuzaid/document-storage"><img src="https://flat.badgen.net/npm/dm/@ezzabuzaid/document-storage" alt="Downloads per month"></a> <a href="https://www.npmjs.com/package/@ezzabuzaid/document-storage"><img src="https://flat.badgen.net/npm/v/@ezzabuzaid/document-storage" alt="Version"></a> <a href="https://www.npmjs.com/package/@ezzabuzaid/document-storage"><img src="https://flat.badgen.net/npm/license/@ezzabuzaid/document-storage" alt="License"></a> <img src="https://flat.badgen.net/badge/icon/Typed?icon=typescript&amp;label&amp;labelColor=blue&amp;color=555555" alt="Typed with TypeScript"></p>
<p>Please consider following this project’s author, <a href="https://github.com/ezzabuzaid">Ezz</a>, and consider starring the project to show your ❤️ and support.</p>
<h2 id="whats-the-library-for">What’s the library for?</h2>
<p>Imagine that you’re working on an application that required to use browser storages depends on browser support, data amount, or a case that required to choose storage on runtime.</p>
<p>You’re frequently changing your backend service and for a reason, you want to switch from firebase to another cool thing, and a problem arise where you afraid from changing due to different functionality, …etc.</p>
<p>Facilitate the way to sync the data from the browser storage (WebSql, IndexDB) to the server either in Web worker or in the default browser context.</p>
<h4 id="here-we-go">Here We Go</h4>
<blockquote>
<p>(write once and change without worry)</p>
</blockquote>
<hr>
<p>How to think of it!<br>
<em>you have a key value pairs object and you want to treat it as model where you can save, update, retrive and delete the data from.</em></p>
<h2 id="apis">Api’s</h2>
<p><strong>Storages</strong></p>
<ul>
<li>
<p>Sync storages</p>
<ol>
<li>Local storage</li>
<li>Session storage</li>
<li>In Memory storage ( simple plain object {} )</li>
</ol>
</li>
<li>
<p>Async storages</p>
<ol>
<li>IndexedDB</li>
</ol>
</li>
</ul>
<p><strong>Database Api’s</strong></p>
<pre><code>1. database.collection(string name) | fetch the collection if exist or create new one
2. database.clear() | clear out the entire database
</code></pre>
<p><strong>Collection Api’s</strong></p>
<pre><code>3. collection.create(T obj) | store POJO and patch auto increment id as number
4. collection.update(Entity&lt;T&gt; entity) | replace the old Entity object with new Entity Object
5. collection.delete(number id) | delete and entity object using it's id
6. collection.set(Entity&lt;T&gt; entity) | replace an entity if exist or create new one
7. collection.clear() | clear out the entire collection
8. collection.get((T entity, number index) =&gt; boolean) | query for a specific entity and return the first match
</code></pre>
<h4 id="usage">Usage</h4>
<p><strong>SyncDatabase</strong><br>
First kind of database that implements the blocking operation like <code>LocalStorage</code></p>
<pre><code>const pojo = {name:'MyName', age: 10};
const db = new SyncDatabase(new Localstorage('MyStorage'))
const collection = db.collection('MyCollection');
const entity = collection.create(pojo);
collection.delete(entity.id);
</code></pre>
<p><strong>AsyncDatabase</strong><br>
Second kind of database that implements the non-blocking operation like <code>IndexedDB</code>, <code>Http</code> and any Storage that doesn’t block the execution</p>
<pre><code>const pojo = {name:'MyName', age: 10};
const db = new AsyncDatabase(new IndexDB('MyObjectStore'));
const collection = db.collection('MyCollection');
const entity = await collection.create(pojo);
await collection.delete(entity.id);
</code></pre>
<h4 id="custom-storage">Custom Storage</h4>
<p>In order to use custom storage all that you need is to Implement the either the <code>IAsyncStorage</code> interface or <code>ISyncStorage</code> depends on your needs</p>
<pre><code>class BackendStorage implements IAsyncStorage {
  get&lt;T&gt;(name: string): Promise&lt;Entity&lt;T&gt;&gt; {
    return fetch(`url/${name}`)
      .then(res =&gt; res.json());
  }
  clear(name?: string): Promise&lt;void&gt; {
    return fetch(`url/${name}`, {
      method: 'POST',
      body: JSON.stringify([])
    })
      .then(res =&gt; res.json());
  }
  set&lt;T&gt;(name: string, value: Entity&lt;T&gt;[]): Promise&lt;void&gt; {
    return fetch(`url/${name}`, {
      method: 'POST',
      body: JSON.stringify(value)
    })
      .then(res =&gt; res.json());
  }
}

const database = new AsyncDatabase(new BackendStorage());
const collection = database.collection('MyCollection');
</code></pre>
<p>please note that the <code>url/${name}</code> <strong>name</strong> part is the collection name</p>
<h4 id="standalone-instantiating">Standalone instantiating</h4>
<p>Up until now, you learned how to use the offered <strong>Storages</strong> with <strong>Database</strong> and how we can store multiple collections within each storage<br>
but what if you just want to deal with <strong>LocalStorage</strong> directly or <strong>InMemoryStorage</strong>!<br>
All storages implement ISyncStorage, therefore, the offered API’s are the same</p>
<pre><code>const storage = new Storage('NameSpace');
storage.set('myKey', [{}]) | save the [{}] inside the localstorage;
storage.get('myKey') | retrieve the associated value from localstorage.NameSpace
storage.delete('myKey') | delete the associated value
storage.clear(); | clear out the entire NameSpace
</code></pre>
<h5 id="framework-integration">Framework integration</h5>
<ul>
<li>Angular<br>
Angular uses a dependency injection framework to handle instances instantiating so we need to adhere to that way in order to get the same instance from the root module<br>
<strong>Note</strong>: lazy loading modules working differently which implies that lazyloaded module instances are different from eager modules instances</li>
</ul>
<pre><code>providers: [
	{
		provide:  LocalStorage,
		useValue:  new  LocalStorage('StorageName'),
	},
	{
		provide:  SessionStorage,
		useValue:  new  SessionStorage('StorageName'),
	}
]
</code></pre>
<p><strong>SSR</strong> will required additional setup by the way since LocalStorage, SessionStorage not available in server side</p>
<h2 id="worthnote">Worthnote</h2>
<p>Should you use this library?<br>
I think the above reasons are not desired all of this,<br>
in general, overengineer the code is a bad thing, so you really need to think twice before immediately digging with it.</p>
<h2 id="contributing">Contributing</h2>
<p>Don’t hesitate to open issues and make a pull request to help improve code</p>
<ol>
<li>Fork it!</li>
<li>Create your feature branch: <code>git checkout -b my-new-feature</code></li>
<li>Commit your changes: <code>git commit -m 'Add some feature'</code></li>
<li>Push to the branch: <code>git push origin my-new-feature</code></li>
<li>Submit a pull request :D</li>
</ol>
<h2 id="versioning">Versioning</h2>
<p>This library will be maintained under the semantic versioning guidelines.<br>
Releases will be numbered with the following format:<br>
<code>&lt;major&gt;.&lt;minor&gt;.&lt;patch&gt;</code><br>
For more information on SemVer, please visit <a href="http://semver.org">http://semver.org</a>.</p>
<h2 id="summary">Summary</h2>
<ol>
<li>This library built on top of typescript so it’s fully supported for types,</li>
<li>The only way to install through npm (NO CDN).</li>
<li>It could be used in Node Js since it’s plain functions and objects nothing related to a browser unless you decided to use browser things.</li>
<li>Entity! just a fancy name.</li>
</ol>
<h2 id="developer">Developer</h2>
<h5 id="ezzabuzaid"><a href="mailto:ezzabuzaid@hotmail.com">Ezzabuzaid</a></h5>
<ul>
<li><a href="https://dev.to/ezzabuzaid">Dev.to</a></li>
<li><a href="https://github.com/ezzabuzaid">GitHub</a></li>
<li><a href="https://www.linkedin.com/in/ezzabuzaid">Linkedin</a></li>
</ul>
<h2 id="maintainers">Maintainers</h2>
<p><a href="https://github.com/ezzabuzaid"><strong>ezzabuzaid</strong></a> - (author) - <a href="mailto:ezzabuzaid@hotmail.com">ezzabuzaid@hotmail.com</a></p>
<h2 id="license">License</h2>
<h5 id="the-mit-license-mit">The MIT License (MIT)</h5>
<h3 id="todo">TODO</h3>
<ul>
<li>Support transactions</li>
<li>Better error handling</li>
<li>Limit collection size</li>
</ul>
<h1 id="built-with-love-3">Built with love &lt;3</h1>

