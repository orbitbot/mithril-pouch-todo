pouch-todo
==========

A simple todo-app similar to TodoMVC, using [Mithril.js]() and [PouchDB](http://pouchdb.com) to abstract browser storage and potentially sync to CouchDB. This is based on 
[an old AngularJS version](https://github.com/orbitbot/pouch-todo).


[Try a live demo on GH pages](http://orbitbot.github.io/mithril-pouch-todo/)

<br>
Requirements
------------

- a browser that PouchDB supports, see the section Browser Support [here](http://pouchdb.com/learn.html)  

<br>
Try it out
----------

[Try a live demo on GH pages](http://orbitbot.github.io/mithril-pouch-todo/), or download this repo and open the index.html file in your browser of choice. It should work without a server, or then use something like the built-in Python webserver:

```bash
$ git clone https://github.com/orbitbot/pouch-todo
$ cd pouch-todo
$ python -m SimpleHTTPServer
```

- if you want to try out the CouchDB synchronization, see PouchDB documentation for how to tweak the db setup in the source code.

<br>
Notes
-----

- ISC licensed
- the main font is Montserrat, and the icons were generated using [Fontello](http://fontello.com)
- the used fonts are covered by the [Open Fonts License](http://scripts.sil.org/OFL)
