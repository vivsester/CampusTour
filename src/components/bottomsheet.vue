<template>
  <div :class="{ bottomsheetopen: show }" class="bottom-sheet">
    <div class="handlebar"></div>
    <div class="content">
    <!--default content-->
      <div class="text-container">
        <slot name="title">
          <h1>Schön, dass du hier bist &excl;</h1>
        </slot>
        <slot name="address">
          <p>Hier findest du eine Erkärung</p>
        </slot>
        <br>
        <slot name="text">
          <p>Bei der Campus-Tour bekommst du alle wichtigen Informationen zu den einzelnen Gebäuden und einen Überblick über wichtige Anlaufstellen der DHBW Mosbach. 
            Außerdem begleitet dich die Campus-Tour und zeigt dir, was du wo tun kannst.Ich wünsche dir viel Spaß beim Entdecken! </p>
        </slot>
      </div>
      <div class="image-container">
        <slot name="image">
          <img src="../assets/default-content-explain.svg" alt="Storyset Illustration" class="image" />
        </slot>
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
}

.image {
  max-width: 100%;
  height: auto;
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