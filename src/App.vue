<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import store from './utils/store'
export default {
  name: 'myCom',
  store,
}
</script>

<style>
#app {
}
</style>
