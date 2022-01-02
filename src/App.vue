<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./view/HelloWorld.vue";
import Login from "./view/Login.vue";
</script>

<template>
  <!-- <HelloWorld msg="Socket.io" />x -->
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
