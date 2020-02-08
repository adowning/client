<template>
  <div class="here-map">
    <div ref="map" id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'HereMap',
  data() {
    return {
      map: {},
      platform: {},
      router: {},
      geocoder: {},
      directions: [],
      ui: {},
    }
  },
  props: {
    appId: String,
    apiKey: String,
    lat: String,
    lng: String,
  },
  created() {
    this.platform = new H.service.Platform({
      apikey: this.apiKey,
    })
    this.router = this.platform.getRoutingService()
    this.geocoder = this.platform.getGeocodingService()
  },
  mounted() {
    var pixelRatio = window.devicePixelRatio || 1
    let defaultLayers = this.platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320,
    })
    this.map = new H.Map(this.$refs.map, defaultLayers.vector.normal.map, {
      zoom: 10,
      center: { lng: this.lng, lat: this.lat },
      pixelRatio: pixelRatio,
    })
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))
    var animatedSvg =
      "<svg style='width:24px;height:24px' viewBox='0 0 24 24'> <path fill='currentColor' d='M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M204H4V6H20V4Z' /></svg>"

    // Create an icon object, an object with geographic coordinates and a marker:
    var icon = new H.map.DomIcon(animatedSvg),
      coords = { lat: 32.3112106941694, lng: -95.2633916507901 },
      marker = new H.map.DomMarker(coords, { icon: icon })

    // Set map center and zoom, add the marker to the map:
    // map.setCenter(coords)

    this.map.addObject(marker)
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers)
  },
  methods: {
    route(start, range) {
      var params = {
        mode: 'fastest;car;traffic:enabled',
        range: range,
        rangetype: 'time',
        departure: 'now',
      }
      this.map.removeObjects(this.map.getObjects())
      this.getCoordinates(start).then(
        geocoderResult => {
          params['start'] = geocoderResult[0].lat + ',' + geocoderResult[0].lng
          this.router.calculateIsoline(
            params,
            data => {
              if (data.response) {
                var center = new H.geo.Point(data.response.center.latitude, data.response.center.longitude),
                  isolineCoords = data.response.isoline[0].component[0].shape,
                  linestring = new H.geo.LineString(),
                  isolinePolygon,
                  isolineCenter
                isolineCoords.forEach(coords => {
                  linestring.pushLatLngAlt.apply(linestring, coords.split(','))
                })
                isolinePolygon = new H.map.Polygon(linestring)
                isolineCenter = new H.map.Marker(center)
                this.map.addObjects([isolineCenter, isolinePolygon])
                this.map.setViewBounds(isolinePolygon.getBounds())
              }
            },
            error => {
              console.error(error)
            },
          )
        },
        error => {
          console.error(error)
        },
      )
    },
    getCoordinates(query) {
      return new Promise((resolve, reject) => {
        this.geocoder.geocode(
          { searchText: query },
          data => {
            if (data.Response.View[0].Result.length > 0) {
              data = data.Response.View[0].Result.map(location => {
                return {
                  lat: location.Location.DisplayPosition.Latitude,
                  lng: location.Location.DisplayPosition.Longitude,
                }
              })
              resolve(data)
            } else {
              reject({ message: 'No data found' })
            }
          },
          error => {
            reject(error)
          },
        )
      })
    },
  },
}
</script>

<style scoped></style>
