<template>
  <div :class="pinClass" @click="onClick">
    <img v-if="!isChecked && !isClose" src="@/assets/pingrey.svg" alt="Pin" />
    <img v-else-if="isClose" src="@/assets/pinyellow.svg" alt="Close Pin" />
    <img v-else-if="isChecked" src="@/assets/pingreen.svg" alt="Checked Pin" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClose: false,
      isChecked: false,
      pinLocation: { latitude: 49.359277, longitude: 9.1522415}, 
      userLocation: null
    };
  },
  computed: {
    pinClass() {
      if (this.isChecked) {
        return 'pin green';
      } else if (this.isClose) {
        return 'pin yellow';
      } else {
        return 'pin grey';
      }
    }
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
        const distance = this.calculateDistance(
          this.userLocation.latitude,
          this.userLocation.longitude,
          this.pinLocation.latitude,
          this.pinLocation.longitude
        );
        if (distance <= 20) {
          this.isClose = true;
        } else {
          this.isClose = false;
        }
      }
    },
    onClick() {
      this.isChecked = !this.isChecked;
      this.isClose = false;
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
     return d * 1000; // Convert to meters
    },
    deg2rad(deg) {
     return deg * (Math.PI / 180);
    }
  }
};
</script>

<style scoped>
.pin {
  display: inline-block;
  cursor: pointer;
}

.pin img {
  width: 30px;
  height: 30px;
}

.grey {
  fill: #ccc;
}

.yellow {
  fill: #ffcc00;
}

.green {
  fill: #4caf50;
}

.pin.clicked img {
  transform: scale(1.5); /* Scale the image 1.5 times when clicked */
}
</style>