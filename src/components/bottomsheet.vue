<template>
  <div :class="{ bottomsheetopen: show }" class="bottom-sheet">
    <div class="handlebar"></div>
    <div class="content">
      <h1>Gebäudename</h1>
      <p>Adresse</p>
      <br>
      <p>Fließtext links: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum</p>
      <div class="image-container">
        <img src="../assets/beispielbild.jpg" alt="Bild" class="image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Hammer from 'hammerjs';

const show = ref(false);

onMounted(() => {
  const btsheet = document.querySelector(".bottom-sheet");
  let hammerInstance = new Hammer(btsheet);
  hammerInstance.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

  hammerInstance.on('swipeup', () => {
    show.value = true;
  });

  hammerInstance.on('swipedown', () => {
    show.value = false;
  });
});
</script>

<style scoped>
.bottom-sheet {
  transition: 1s all;
  position: fixed;
  bottom: -45vh;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: white;
  height: auto;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.bottomsheetopen {
  bottom: 0 !important;
}

.handlebar {
  width: 35px;
  height: 5px;
  background-color: #000;
  border-radius: 2.5px;
  opacity: 0.1;
  margin: 0 auto 16px auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.image {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
}
</style>