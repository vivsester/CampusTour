<template>
  <div v-if="show" class="bottom-sheet" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="handlebar"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(true);

const open = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

let touchStartY = 0;
let touchMoveY = 0;

const onTouchStart = (event) => {
  touchStartY = event.touches[0].clientY;
};

const onTouchMove = (event) => {
  touchMoveY = event.touches[0].clientY;
};

const onTouchEnd = () => {
  const swipeDistance = touchMoveY - touchStartY;
  if (swipeDistance >= 50) {
    close();
  }
};

</script>

<style scoped>
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: 50vh;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.handlebar {
  width: 35px;
  height: 5px;
  background-color: #000;
  border-radius: 2.5px;
  opacity: 0.1;
  margin: 0 auto 16px auto; /* Zentriert die Handlebar horizontal */
}
</style>
