<template>
  <div class="android-check-button"
       :class="{ 'green':  isChecked}"
       @click="btnChecked">
    <span>&#10003;</span>
  </div>
</template>

<script setup>
import { getFromLS, saveToLS } from './utils.vue';
import { onBeforeUnmount, ref } from "vue";
const props = defineProps(['GebaeudeName'])
const isChecked = ref(false)

const btnIntvl = setInterval(()=>{
  if(props.GebaeudeName){
  let currentValue = getFromLS( props.GebaeudeName );
  isChecked.value = currentValue['explored'] ? true : false;
}},1000);
onBeforeUnmount(()=>{
  window.clearInterval(btnIntvl);
})

function btnChecked (){
  let currentValue = getFromLS( props.GebaeudeName );
  if(currentValue && currentValue['explored']){
    saveToLS( props.GebaeudeName, {'btnclicked':true, 'explored': currentValue['explored'] ? true : false});
  }else{
    saveToLS( props.GebaeudeName, {'btnclicked':true, 'explored': false});
  }
  
}
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


.android-check-button:not(.green) {
  background-color: grey;
  color: white;
  
}
</style>
