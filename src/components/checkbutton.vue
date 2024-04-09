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
    // Retrieve isChecked state from localStorage on component creation
    this.isChecked = localStorage.getItem('isChecked') === 'true';
  },
  methods: {
    toggleChecked() {
      if (this.isClickable) {
        this.isChecked = !this.isChecked;
        // Store isChecked state in localStorage when toggled
        localStorage.setItem('isChecked', this.isChecked);
      }
    },
    async checkProximity() {
      if ('geolocation' in navigator) {
        try {
          const position = await this.getCurrentPosition();
          const distance = this.calculateDistance(position.coords.latitude, position.coords.longitude, this.pinLocation.latitude, this.pinLocation.longitude);
          this.isClickable = distance < 100; 
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
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;   
  height: 50px; 
  background-color: transparent;
  color: white; 
  font-size: 24px;
  border-radius: 50%;
  padding: 0; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2; 
  transition: background-color 0.3s, color 0.3s;
  border: 2px solid rgb(13, 11, 11);
}

.green {
  background-color: green;
  color: white;
}

.yellow {
  background-color: rgb(230, 218, 0);
  color: white;
}

.android-check-button:not(.green):not(.yellow) {
  background-color: grey;
  color: white;
  cursor: not-allowed;
}
</style>
