<template>
  <nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <!-- Brand -->
    <!-- <router-link to="/" class="navbar-brand">Admin</router-link> -->

    <!-- Toggler/collapsibe Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar links -->
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            v-bind:class="[this.$route.path == '/' ? 'active' : '']"
          >Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/license"
            class="nav-link"
            v-bind:class="[this.$route.path == '/license'|| this.$route.path == '/license/add' ? 'active' : '']"
          >License</router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/price"
            class="nav-link"
            v-bind:class="[this.$route.path == '/price' || this.$route.path == '/price/add' ? 'active' : '']"
          >Price</router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/ref"
            class="nav-link"
            v-bind:class="[this.$route.path == '/ref' || this.$route.path == '/ref/add' ? 'active' : '']"
          >Ref</router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="logout()">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
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