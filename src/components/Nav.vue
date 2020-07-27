<template>
  <div class="p-3">
    <b-button variant="primary" v-b-toggle.sidebar>☰</b-button>

    <SideBar />
  </div>
</template>

<script>
import SideBar from "@/components/SiderBar";

export default {
  components: {
    SideBar
  }
};
</script>

<style>
</style>