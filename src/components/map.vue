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

    // Try to get user's current location with high accuracy
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = L.latLng(latitude, longitude);

        // Add a marker for user's location
        L.marker(userLocation).addTo(this.map).bindPopup('Deine Lokation').openPopup();

        // Center the map on user's location
        this.map.setView(userLocation, 16);
      }, (error) => {
        console.error('Error getting user location:', error);
      }, {
        enableHighAccuracy: true, // Use high accuracy
        timeout: 10000, // Increase timeout to 10 seconds
        maximumAge: 0 // Maximum age of a cached position
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
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
