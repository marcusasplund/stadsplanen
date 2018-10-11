import L from 'leaflet'
import 'leaflet-rastercoords'
import './utils/permalink'
import './styles/app.scss'

const init = () => {
  let img = [
    // original width
    21723,
    // original height of image
    15594
  ]
  // create the map
  let map = L.map('map', {
    minZoom: 3
  })

  // assign map and image dimensions
  let rc = new L.RasterCoords(map, img)
  map.setMaxZoom(rc.zoomLevel())
  // set the view on a marker ...
  let link = L.Permalink.getMapLocation(3, rc.unproject([img[0], img[1]]))
  map.setZoom(link.zoom)
  map.panTo(link.center)

  // the tile layer containing the image generated with gdal2tiles --leaflet ...
  L.tileLayer('./tiles/{z}/{x}/{y}.png', {
    noWrap: true,
    attribution: 'Map <a href="http://gbg.yimby.se/2017/11/historisk-stadsplaneanaly_3999.html">' +
      'Historisk stadsplaneanalys för Göteborgs Stad</a>'
  }).addTo(map)
  L.Permalink.setup(map)
}

init('map')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(function (registration) {
      console.log('Service Worker registration successful with scope: ',
        registration.scope)
    })
    .catch(function (err) {
      console.log('Service Worker registration failed: ', err)
    })
}
