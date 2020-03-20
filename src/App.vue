<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import myCom from '@/components/myCom'
export default {
  name: 'myCom'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
