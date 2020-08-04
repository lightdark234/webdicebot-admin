<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Montserrat", sans-serif;
  background: url("../static/bg.png") no-repeat center/cover;
  width: 100%;
  min-height: 100vh;
  height: auto;
}
</style>
