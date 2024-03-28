<template>
  <div>
    <button
      :style="{
        backgroundColor: buttonColor,
        cursor: isClickable ? 'pointer' : 'not-allowed',
        color: '#FFFFFF',
        padding: '12px',
        borderRadius: '50%', // Jetzt ist der Button rund!
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'relative', // Füge diese Zeile hinzu
        width: '2rem',
        height: '2rem',
        display: 'flex',
        justifyContent: 'center', // Zentriere horizontal
        alignItems: 'center', // Zentriere vertikal
      }"
      @click="handleButtonClick"
      :disabled="!isClickable"
    >
      <span v-if="buttonColor === 'green'">✔</span>
      <span v-else>✓</span>
    </button>
  </div>
</template>

<script>
import { calculateDistance } from './utils.vue';
export default {
  data() {
    return {
      buttonColor: '#D3D3D3',
      isClickable: false,
    };
  },
  methods: {
    handleButtonClick() {
      if (this.buttonColor === 'yellow') {
        this.buttonColor = 'green';
        // Speichere den grünen Zustand hier (z. B. in Local Storage oder Vuex Store)
      }
    },
    // Hier kannst du deine andere Funktion implementieren, die die Farbe ändert
    // und die `isClickable`-Eigenschaft entsprechend setzt.
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.checkProximity();
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
    checkProximity() {
      if (this.userLocation) {
        const distance = calculateDistance(
          this.userLocation.latitude,
          this.userLocation.longitude,
          this.pinLocation.latitude,
          this.pinLocation.longitude
        );
        this.isClose = distance <= 20;
      }
    },
    onClick() {
      this.isChecked = !this.isChecked;
      this.isClose = false;
    }
  }
};
</script>
