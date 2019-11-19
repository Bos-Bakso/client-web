<template>
  <div>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" />
      <l-marker
        v-for="(tukang, index) in tukangs"
        :key="index"
        :lat-lng="latLng(tukang.latitude, tukang.longitude)"
        :icon="icon(tukang.image)"
        @click="innerClick(latLng(tukang.latitude, tukang.longitude))"
      ></l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, icon } from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data () {
    return {
      zoom: 13,
      center: latLng(-6.2607371, 106.7815033),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 13,
      currentCenter: latLng(-6.2607371, 106.7815033),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    }
  },
  methods: {
    icon (url) {
      return icon({
        iconUrl: url,
        iconSize: [30, 30],
        iconAnchor: [30, 30]
      })
    },
    latLng (lat, lng) {
      return latLng(lat, lng)
    },
    zoomUpdate (zoom) {
      this.currentZoom = zoom
      this.zoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
      this.center = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick (loc) {
      this.center = loc
      this.currentCenter = loc
      this.zoom = 20
      this.currentZoom = 20
    }
  },
  created () {
    this.$store.dispatch('fetchTukangs')
  },
  mounted () {
    setInterval(() => {
      this.$store.dispatch('fetchTukangs')
    }, 10000)
  },
  computed: {
    tukangs () {
      return this.$store.state.tukangs
    }
  }
}
</script>
