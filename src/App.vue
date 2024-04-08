<script setup>
import checkbutton from './components/checkbutton.vue'
import bottomsheet from './components/bottomsheet.vue'
import pin from './components/pin.vue'
import logo from './components/logo.vue'
import maps from './components/map.vue'
</script>

<template>
  <main>
    <logo/>
    <checkbutton/>
    <Suspense>
      <bottomsheet/>
    </Suspense>
    <pin/>
    <maps/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
