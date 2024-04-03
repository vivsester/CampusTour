<template>
  <div :class="pinClass" @click="onClick">
    <img v-if="!isChecked && !isClose" src="@/assets/pingrey.svg" alt="Pin" />
    <img v-else-if="isClose" src="@/assets/pinyellow.svg" alt="Close Pin" />
    <img v-else-if="isChecked" src="@/assets/pingreen.svg" alt="Checked Pin" />
  </div>
</template>

<script>
import { calculateDistance } from './utils.vue';

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
  transform: scale(1.5); 
}
</style>
