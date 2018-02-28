importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "3aba7dfdcafe6b33db5996d6185d39ca.js",
    "revision": "1bea209fda7c686369021304a453e370"
  },
  {
    "url": "index.html",
    "revision": "3122847fe8370e333ab0838ce78ea55b"
  },
  {
    "url": "stadsplan.css",
    "revision": "bdfb064abc06c4f615bcc655d9b19a03"
  },
  {
    "url": "stadsplan.js",
    "revision": "6a2e9c73f18984c7b1eab3b0bfb742d0"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
