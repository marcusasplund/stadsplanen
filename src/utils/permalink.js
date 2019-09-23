/* globals define */

(function (factory) {
  var L
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['leaflet'], factory)
  } else if (typeof module !== 'undefined') {
    // Node/CommonJS
    L = require('leaflet')
    module.exports = factory(L)
  } else {
    // Browser globals
    if (typeof window.L === 'undefined') {
      throw new Error('Leaflet must be loaded first')
    }
    factory(window.L)
  }
}(function (L) {
  L.Permalink = {
    // gets the map center, zoom-level and rotation from the URL if present, else uses default values
    getMapLocation: (zoom, center) => {
      'use strict'
      zoom = (zoom || zoom === 0) ? zoom : 18
      center = (center) || [52.26869, -113.81034]

      if (window.location.hash !== '') {
        const hash = window.location.hash.replace('#', '')
        const parts = hash.split(',')
        if (parts.length === 3) {
          center = {
            lat: parseFloat(parts[0]),
            lng: parseFloat(parts[1])
          }
          zoom = parseInt(parts[2].slice(0, -1), 10)
        }
      }
      return { zoom: zoom, center: center }
    },

    setup: (map) => {
      'use strict'
      let shouldUpdate = true
      const updatePermalink = function () {
        if (!shouldUpdate) {
          // do not update the URL when the view was changed in the 'popstate' handler (browser history navigation)
          shouldUpdate = true
          return
        }

        const center = map.getCenter()
        const hash = '#' +
                      Math.round(center.lat * 100000) / 100000 + ',' +
                      Math.round(center.lng * 100000) / 100000 + ',' +
                      map.getZoom() + 'z'
        const state = {
          zoom: map.getZoom(),
          center: center
        }
        window.history.pushState(state, 'map', hash)
      }

      map.on('moveend', updatePermalink)

      // restore the view state when navigating through the history, see
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
      window.addEventListener('popstate', (event) => {
        if (event.state === null) {
          return
        }
        map.setView(event.state.center, event.state.zoom)
        shouldUpdate = false
      })
    }
  }

  return L.Permalink
}))
