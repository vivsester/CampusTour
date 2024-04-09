<script setup>
import checkbutton from './components/checkbutton.vue'
import bottomsheet from './components/bottomsheet.vue'
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
    <maps/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
