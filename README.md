# stadsplanen

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## heads up: this is a work in progress!!

Offline support with service worker

## installation

````bash
    $ git clone https://github.com/marcusasplund/stadsplanen.git

    $ cd stadsplanen

    $ yarn

    $ yarn start 
````

Open up application at http://localhost:4000/ in browser

## build a release

````bash
    $ yarn run build

````
This will generate a release directory with your minified/rev'd assets.


## serve static

````bash
    $ yarn run serve

````

This will use serve to statically serve your app from the release directory.
