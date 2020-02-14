---


---

<h1 id="a-faciliteated-way-to-maniplaute-docuemnt">A faciliteated way to maniplaute docuemnt</h1>
<h3 id="whats-the-library-for">What’s the library for?</h3>
<p>Imagine that you’re working on an application that required to use browser storages depends on browser support, data amount, or a case that required to choose storage on runtime.</p>
<p>You’re frequently changing your backend service and for a reason, you want to switch from firebase to another cool thing, and a problem arise where you afraid from changing due to different functionality, …etc</p>
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
<p>Database Api’s</p>
<pre><code>1. database.collection(string name) | fetch the collection if exist or create new one
2. database.clear() | clear out the entire database
</code></pre>
<p>Collection Api’s</p>
<pre><code>1. collection.create(T obj) | store POJO and patch auto increment id as number
2. collection.update(Entity&lt;T&gt; entity) | replace the old Entity object with new Entity Object
3. collection.delete(number id) | delete and entity object using it's id
4. collection.set(Entity&lt;T&gt; entity) | replace an entity if exist or create new one
5. collection.clear() | clear out the entire collection
6. collection.get((T entity, number index) =&gt; boolean) | query for a specific entity and return the first match
</code></pre>
<h3 id="usage">Usage</h3>
<p>SyncDatabase</p>
<pre><code>const pojo = {name:'MyName', age: 10};
const db = new SyncDatabase(new Localstorage('MyStorage'))
const collection = db.collection('MyCollection');
const entity = collection.create(pojo);
collection.delete(entity.id);
</code></pre>
<p>AsyncDatabase</p>
<pre><code>const pojo = {name:'MyName', age: 10};
const db = new AsyncDatabase(new IndexDB('MyStore'));
const collection = db.collection('MyCollection');
const entity = await collection.create(pojo);
await collection.delete(entity.id);
</code></pre>
<h3 id="custom-storage">Custom Storage</h3>
<p>How really I can have firebase here used as AsyncDatabase<br>
all that you need is to Implement the <code>AsyncStorage</code> interface, you can follow the IndexDB way in the source code</p>
<h3 id="worthnote">Worthnote</h3>
<p>Should you use this lib?, I think the above reasons are not desired all of this,<br>
in general, overengineer the code is a bad thing, so you really need to think more before immediately digging with it.</p>
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
<h5 id="built-with-love-3">Built with love &lt;3</h5>

