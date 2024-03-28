<script setup>
import backbutton from './components/backbutton.vue'
import checkbutton from './components/checkbutton.vue'
import bottomsheet from './components/bottomsheet.vue'
import pin from './components/pin.vue'
import userposition from './components/userposition.vue'
import logo from './components/logo.vue'
import maps from './components/map.vue'
</script>

<template>
  <main>
    <logo/>
    <backbutton/>
    <checkbutton/>
    <bottomsheet/>
    <pin/>
    <userposition/>
    <maps/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
