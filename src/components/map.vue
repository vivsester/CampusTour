<template>
  <div id="leaflet-map"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { updateBs } from './bottomsheet.vue';
import { dblist, dbread } from './dbaccess.vue';
import { calculateDistance } from './utils.vue';
let id;
let customIcon = L.icon({
      iconUrl: './Pin_rot.ico',
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
    });
    let customIconYellow = L.icon({
      iconUrl: './Pin_gelb.ico',
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
    });
    let customIconGreen = L.icon({
      iconUrl: './Pin_gruen.ico',
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
    });


async function setMarker(locationId,map,markers){
  let locationData = await dbread(locationId);
  let titel = locationData["Titel"];
  let popupContent = `${titel}`;
  markers[locationId] = L.marker([locationData["Koordinate"]["_lat"], locationData["Koordinate"]["_long"]],{icon:customIcon}).addTo(map).bindPopup(popupContent).openPopup();
  console.log(`Koordinate ${locationId}`,locationData["Koordinate"]);
  markers[locationId].on('click', () => {
    updateBs(locationId);
   
    });
    if ('geolocation' in navigator) {
    id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = L.latLng(latitude, longitude);
          // Remove previous user marker if exists
         
          let accuracy = position.coords.accuracy / 2;
          let distance = calculateDistance(latitude, longitude, locationData["Koordinate"]["_lat"], locationData["Koordinate"]["_long"] );
        if (distance<= 20+ accuracy * 2) {
          if (markers[locationId].getIcon() != customIconYellow) {
            markers[locationId].setIcon(customIconYellow);
          } 
        } else {
          if (markers[locationId].getIcon() != customIcon) {
            markers[locationId].setIcon(customIcon);
        }}
        },(error) => {
          console.error('Error getting user location:', error);
        },
        {
          enableHighAccuracy: true, // Use high accuracy
          timeout: 10000, // Increase timeout to 10 seconds
          maximumAge: 0 // Maximum age of a cached position
        }
        );/* */
      // Function to update user location
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

}

export default {
  data() {
    return {
      userMarker: null
    };
  },
  mounted() {
    this.markers = [];
    // Initialize the map
    this.map = L.map('leaflet-map').setView([49.35330824531996, 9.149673396841493], 16);
    //setMarker("A-Gebaeude");
    
    // Add the tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Try to get user's current location with high accuracy
    if ('geolocation' in navigator) {
      id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = L.latLng(latitude, longitude);
          // Remove previous user marker if exists
          if (this.userMarker) {
            this.map.removeLayer(this.userMarker);
          }
          // Add a blue circle marker for user's location
          let accuracy = position.coords.accuracy / 2;
          this.userMarker = L.circle(userLocation, {
            radius: accuracy,
            weight: 1,
            color: 'blue',
            fillColor: '#3388ff',
            fillOpacity: 0.6
          }).addTo(this.map);
        },(error) => {
          console.error('Error getting user location:', error);
        },
        {
          enableHighAccuracy: true, // Use high accuracy
          timeout: 10000, // Increase timeout to 10 seconds
          maximumAge: 0 // Maximum age of a cached position
        }
        );/* */
      // Function to update user location
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    dblist().then((response)=>{
      response.forEach((value)=>{
        console.log(dblist, value);
        setMarker(value,this.map,this.markers);
      })
    });
  },
  beforeDestroy() {
    // Clear the interval when component is destroyed
    if (id) {
      navigator.geolocation.clearWatch(id);
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
