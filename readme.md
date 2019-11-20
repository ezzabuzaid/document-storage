---


---

<h1 id="a-faciliteated-way-to-maniplaute-docuemnt">A faciliteated way to maniplaute docuemnt</h1>
<h3 id="what-is-this-lib-for">What is this lib for?</h3>
<p>Imagine that you’re working on an application that required to use browser storages depends on browser support, data amount, or a case that required to choose a storage on runtime.</p>
<p>You’re frequntly changing your backend service and for a reason you want to swich from firebase to another cool thing, and a proplem rise where you afrid from changing due to different functionallity, …etc</p>
<h3 id="here-we-go">Here We Go</h3>
<blockquote>
<p>(write once and change without worry)</p>
</blockquote>
<hr>
<p>How to think of it!<br>
<em>you have a key value pairs object and you want to treat it as model where you can save, update, retrive and delete the data from.</em></p>
<h3 id="storges-and-apis">Storges And Api’s</h3>
<p><strong>Storage</strong><br>
Sync storages</p>
<ol>
<li>Browser local storage</li>
<li>Browser session storage</li>
<li>In Memory storage ( simple plain object {} )</li>
</ol>
<p>Async storages</p>
<ol>
<li>Browser Indexdb</li>
</ol>
<p>Database Apis</p>
<ol>
<li>database.collection(String) | fetch the collection if exist or create new one</li>
<li>database.clear() | clear out the entire database</li>
</ol>
<p>Collection Apis</p>
<ol>
<li>collection.create(T) | store POJO and patch auto increment id as number</li>
<li>collection.update(Entity) | replace the old Entity object with new Entity Object</li>
<li>collection.delete(Number) | delete and entity object using it’s id</li>
<li>collection.set(Entity) | replace an entity if exist or create new one</li>
<li>collection.clear() | clear out the entire collection</li>
<li>collection.get((T, Number) =&gt; boolean) | query for a specific entity and return the first match</li>
</ol>
<h3 id="usage">Usage</h3>
<p>SyncDatabase</p>
<pre><code>`const pojo = {name:'MyName', age: 10}`
`const db = new SyncDatabase(new Localstorage('MyStorage'))` 
`const collection = db.collection('MyCollection');`
`const entity = collection.create(pojo)`
`collection.delete(entity.id)`
</code></pre>
<p>AsyncDatabase</p>
<pre><code>`const pojo = {name:'MyName', age: 10}`
`const db = new AsyncDatabase(new IndexDB('MyStore'))` 
`const collection = db.collection('MyCollection');`
`const entity = await collection.create(pojo)`
`await collection.delete(entity.id)`
</code></pre>
<h3 id="custom-storage">Custom Storage</h3>
<p>How really I can have firebase here used as AsyncDatabase<br>
all what you need is to Implement the <code>AsyncStorage</code> interface, you can follow the IndexDB way in the source code</p>
<h3 id="worthnote">Worthnote</h3>
<p>Should you use this lib?, I think the above reasons are not desired all of this,<br>
in general overengineer the code is bad thing, so you really need to think more before immeditaly digging with it.</p>
<h3 id="summary">Summary</h3>
<ol>
<li>This lib built on top of typescript so it’s fully suported for types,</li>
<li>The only way to install throug npm (NO CDN)</li>
<li>It could be used in Node Js since it’s plain functions and objects nothing related to browser unless you decided to use browser things</li>
<li>entity!! just a fancy name.</li>
<li>want to contirbute! I’ll be glad.</li>
</ol>
<p>Sorry for any confusing</p>

