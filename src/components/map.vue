<script setup>
var map = L.map('map').setView({lon: 0, lat: 0}, 2);
</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
</style>