<template>
  <div class="home-container">
    <router-view></router-view>
    <tabBar />
  </div>
</template>

<script>
import tabBar from '../components/TabBar.vue';

export default {
  components: {
    tabBar,
  },
};
</script>

<style>
</style>
