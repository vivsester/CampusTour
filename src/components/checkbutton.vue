<template>
  <div class="android-check-button"
       :class="{ 'green': isClickable && isChecked, 'yellow': isClickable && !isChecked }"
       @click="toggleChecked">
    <span>&#10003;</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      isClickable: false,
      pinLocation: {latitude: 49.359277, longitude: 9.1522415}
    };
  },
  
  created() {
    this.checkProximity();
  },
  methods: {
    toggleChecked() {
      if (this.isClickable) {
        this.isChecked = !this.isChecked;
      }
    },
    async checkProximity() {
      if ('geolocation' in navigator) {
        try {
          const position = await this.getCurrentPosition();
          const distance = this.calculateDistance(position.coords.latitude, position.coords.longitude, this.pinLocation.latitude, this.pinLocation.longitude);
          this.isClickable = distance < 100; // Checking if distance is less than 100 meters
        } catch (error) {
          console.error('Error getting current position:', error);
        }
      } else {
        console.error('Geolocation is not supported.');
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; // Distance in meters
      return distance;
    }
  }
};
</script>

<style scoped>
.android-check-button {
  position: fixed; /* Fixed position */
  bottom: 20px; /* Adjust bottom position */
  right: 20px; /* Adjust right position */
  width: 50px; /* Adjust button size */
  height: 50px; /* Adjust button size */
  background-color: transparent;
  color: white; /* Default color for check icon */
  font-size: 24px;
  border-radius: 50%; /* Make the button round */
  padding: 0; /* Remove padding */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2; /* Set z-index */
  transition: background-color 0.3s, color 0.3s;
}

.green {
  background-color: green;
  color: white;
}

.yellow {
  background-color: yellow;
  color: white;
}

.android-check-button:not(.green):not(.yellow) {
  background-color: grey;
  color: white;
  cursor: not-allowed;
}
</style>
