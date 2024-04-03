<template>
  <div :class="{ bottomsheetopen: show }" class="bottom-sheet">
    <div class="handlebar"></div>
    <div class="content">
      <div class="text-container">
        <h1>{{ heading }}</h1>
        <div class="button-container">
          <checkbutton/>
        </div>
        <p>{{ adress }}</p>
        <br>
        <p>{{ text }}</p>
    </div>
      <div class="image-container">
        <img :src="image" class="image" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import Hammer from 'hammerjs';
import checkbutton from './checkbutton.vue';
import { dbread } from './dbaccess.vue';

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

//Content füllen 
const heading = ref("Schön, dass du hier bist!"); 
const adress = ref("Starte von wo immer du willst");
const text = ref("Campus-Tour nimmt dich an die Hand: Du bekommst du alle wichtigen Informationen zu den Hotspots der DHBW Mosbach der DHBW Mosbach. Viel Spaß beim Entdecken! ");
const image = ref('../default-content-explain.svg');
let bldn = await dbread('A-Gebaeude');
text.value = bldn["Beschreibungstext"]
</script>

<style scoped>
.bottom-sheet {
  transition: 1s all;
  position: fixed;
  bottom: -42vh;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: white;
  height: 60vh;
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
}

.text-container {
  flex: 1;
  margin: 10px; 
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  align-items: center;
}

.image {
  max-width: auto;
  height: flex;
  border-radius: 15px;
}

@media (min-width: 600px) {
  .content {
    flex-direction: row;
  }

  .text-container {
    order: 1;
  }

  .image-container {
    order: 2;
  }
}
</style>