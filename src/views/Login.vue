<template>
  <b-container class="p-4">
    <b-overlay :show="loading" rounded="sm">
      <label>User name</label>
      <b-form-input v-model="userName" class="mb-2"></b-form-input>

      <label>Password</label>
      <b-form-input v-model="password" type="password" class="mb-2"></b-form-input>

      <b-button variant="primary" block @click="login()">Login</b-button>
    </b-overlay>
  </b-container>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      loading: false,
      userName: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      this.loading = !this.loading;
      axios({
        url: API_URL + "/user/login",
        method: "POST",
        data: {
          userName: this.userName,
          password: this.password,
        },
      }).then((response) => {
        this.loading = !this.loading;
        if (!response.data.status)
          return this.showAlert(response.data.message, false);
        localStorage.setItem("token", response.data.token);
        this.$router.push({ path: "/" });
      });
    },
    showAlert: function (message, type = true) {
      this.$swal.fire({
        icon: `${type ? "success" : "error"}`,
        title: message,
        showConfirmButton: false,
        timer: 15e2,
      });
    },
  },
};
</script>

<style>
</style>