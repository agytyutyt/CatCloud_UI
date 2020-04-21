<template>
  <div id="app" style="overflow: hidden">
    <router-view/>
  </div>
</template>

<script>
  import store from './utils/store'
  import qs from 'qs'
export default {
  name: 'myCom',
  store,

}
</script>

<style>
#app {
}
</style>
