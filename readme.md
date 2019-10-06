---


---

<h1 id="a-faciliteated-way-to-maniplaute-docuemnt">A faciliteated way to maniplaute docuemnt</h1>
<h3 id="what-is-this-lib-for">What is this lib for?</h3>
<p>imagine that you’re working on an application that required to use browser storages depends on browser support, data amount, or a case that required to choose a storage on runtime</p>
<p>you’re frequntly changing your backend service and you don’t want to refactor the app,<br>
for example switcing from firebase to you own backend</p>
<h4 id="so-thats-it-write-once-and-change-without-worry">so that’s it, write once and change without worry</h4>
<hr>
<h3 id="sync-storagies">Sync storagies</h3>
<ol>
<li>Browser local storage</li>
<li>Browser session storage</li>
<li>Memory storage</li>
</ol>
<h3 id="async-storagies">Async storagies</h3>
<ol>
<li>Browser Indexdb (under development)</li>
</ol>
<h2 id="usage">Usage</h2>
<p><code>const db = new SyncDatabase(new Localstorage('myStorage'))</code></p>
<p><code>db.collection('myCollectino').create({} as myObject)</code></p>

