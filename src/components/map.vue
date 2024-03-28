<template>
  <div id="leaflet-map"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  mounted() {
    // Initialize the map
    this.map = L.map('leaflet-map').setView([49.35330824531996, 9.149673396841493], 16);

    // Add the tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }
};
</script>

<style scoped>
#leaflet-map {
  min-height: 100%;
  min-width: 100%;
  display: flex;
  margin:0;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:0;
}
</style>
