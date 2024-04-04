<template>
  <div id="leaflet-map"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '@/assets/pingrey.svg';
import markerIconGreen from '@/assets/pingreen.svg';

export default {
  data() {
    return {
      userMarker: null
    };
  },
  mounted() {
    let customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
    });
    this.customIconGreen = L.icon({
      iconUrl: markerIconGreen,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
    // Initialize the map
    this.map = L.map('leaflet-map').setView([49.35330824531996, 9.149673396841493], 16);
    this.marker = L.marker([49.35330824531996, 9.149673396841493], { icon: customIcon }).addTo(this.map);
    this.marker.bindPopup("Beispieltext").openPopup();
        this.marker.on('click', () => {
      if (this.marker.getIcon() === this.customIcon) {
        this.marker.setIcon(this.customIconGreen);
      } else {
        this.marker.setIcon(this.customIcon);
      }
    });

    // Add the tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Try to get user's current location with high accuracy
    if ('geolocation' in navigator) {
      // Function to update user location
      const updateUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = L.latLng(latitude, longitude);

          // Remove previous user marker if exists
          if (this.userMarker) {
            this.map.removeLayer(this.userMarker);
          }

          // Add a blue circle marker for user's location
          this.userMarker = L.circleMarker(userLocation, {
            radius: 8,
            color: 'blue',
            fillColor: '#3388ff',
            fillOpacity: 1
          }).addTo(this.map).bindPopup('Dein Standort').openPopup();

          // Center the map on user's location
          
        }, (error) => {
          console.error('Error getting user location:', error);
        }, {
          enableHighAccuracy: true, // Use high accuracy
          timeout: 10000, // Increase timeout to 10 seconds
          maximumAge: 0 // Maximum age of a cached position
        });
        this.map.setView(userLocation, 16);
      };

      // Update user location initially
      updateUserLocation();

      // Update user location every 5 seconds
      this.updateInterval = setInterval(updateUserLocation, 5000);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  },
  beforeDestroy() {
    // Clear the interval when component is destroyed
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
};
</script>

<style scoped>
#leaflet-map {
  min-height: 100%;
  min-width: 100%;
  display: flex;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}
</style>
