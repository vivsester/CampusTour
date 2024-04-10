<template>
  <div :class="{ bottomsheetopen: show }" class="bottom-sheet">
    <div id="handle-wrap" @click="show = !show">
      <div class="handlebar"></div>
    </div>
    <div class="content">
      <div class="text-container">
        <div class="button-container">
          <checkbutton :GebaeudeName="aktivesGebaeude"/>
        </div>
        <h1>{{ heading }}</h1>
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
<script>
import { ref } from 'vue';
import checkbutton from './checkbutton.vue';
import { dbread } from './dbaccess.vue';

const heading = ref("Schön, dass du hier bist!"); 
const adress = ref("Starte von wo immer du willst");
const text = ref("Campus-Tour nimmt dich an die Hand: Du bekommst du alle wichtigen Informationen zu den Hotspots der DHBW Mosbach der DHBW Mosbach. Viel Spaß beim Entdecken! ");
const image = ref('../default-content-explain.svg');
const aktivesGebaeude = ref("")

export async function updateBs(dbKey){
  aktivesGebaeude.value = dbKey;
  let newDataset = await dbread(dbKey);
  if(newDataset != "No such document!"){
    heading.value = newDataset["Titel"];
    adress.value = `${newDataset["Straße"]} ${newDataset["Hausnummer"]}`;
    text.value = newDataset["Beschreibung"];
    image.value = newDataset["BildID"];
  }else{
    heading.value = "LALALA FEHLER!!! LALALA";
    adress.value = "Antwortstraße 42, 404 errortown";
    text.value = "Leider ging da was schief.";
  }
}
</script>

<style scoped>
.bottom-sheet {
  transition: 1s all;
  position: fixed;
  bottom: calc(130px - 100vh);
  left: 0;
  right: 0;
  z-index: 99;
  background-color: white;
  height: 100vh;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 16px;
  padding-top: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.bottomsheetopen {
  bottom: 0 !important;
}
#handle-wrap{
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 0 -16px;
  box-sizing: border-box;
  width:calc(100% + 32px);
  border-bottom: 1px solid #eee;
}
.handlebar {
  width: 35px;
  height: 5px;
  background-color: #000;
  border-radius: 2.5px;
  opacity: 0.1;
  margin: 0 auto;
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
  top: 0;
  align-items: top;
}

.image {
  max-width: 80%;
  max-height: 80%;
  border-radius: 15px;
  top:0;
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