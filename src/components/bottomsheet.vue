<template>
  <div :class="{bottomsheetopen: show}" class="bottom-sheet">
    <div class="handlebar"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Hammer from 'hammerjs';
onMounted(() => {
  const btsheet = document.querySelector(".bottom-sheet")
  console.log(btsheet)
                // instantiate Hammer.js on the element
                let hammerInstance = new Hammer(btsheet);
                hammerInstance.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
                // example: listen to swipe event
                hammerInstance.on('swipeup', (event) => {
                    console.log('Swiped!', event);
                    show.value = true;
                });

                hammerInstance.on('swipedown', (event) => {
                  console.log('Down', event);
                  show.value = false;
                })

                // more events here, like 'tap', 'pinch', etc.
            }
        );
const show = ref(false);

const open = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

function onSwipeUp() {
  open();
}

function onSwipeDown() {
  close();
}

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
  height: 50vh;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.bottomsheetopen {
  bottom: 0 !important;
  transition: 1s all;
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
