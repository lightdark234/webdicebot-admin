<template>
  <b-sidebar id="sidebar" backdrop shadow>
    <router-link to="/admin" class="ml-4">Admin</router-link>
    <hr />

    <router-link to="/admin/license" class="ml-4">License</router-link>
    <hr />

    <router-link to="/admin/price" class="ml-4">Price</router-link>
    <hr />

    <a href="#" class="ml-4" @click="logout()">Logout</a>
  </b-sidebar>
</template>

<script>
export default {
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
};
</script>

<style>
</style>