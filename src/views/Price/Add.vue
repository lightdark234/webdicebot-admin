<template>
  <div>
    <Nav />

    <b-container>
      <router-link to="/admin/price">
        <b-button class="mb-2">Cancel</b-button>
      </router-link>

      <b-overlay :show="loading" rounded="sm">
        <label>Limit</label>
        <b-form-input v-model="limit" class="mb-2"></b-form-input>

        <label>Amount</label>
        <b-form-input v-model="amount" class="mb-2"></b-form-input>

        <b-button variant="primary" block @click="add()">Add</b-button>
      </b-overlay>
    </b-container>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  components: {
    Nav
  },
  data() {
    return {
      loading: false,
      limit: 0,
      amount: 0
    };
  },
  methods: {
    add: function() {
      this.loading = !this.loading;
      axios({
        url: API_URL + "/price",
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          limit: this.limit,
          amount: this.amount
        }
      }).then(response => {
        this.loading = !this.loading;
        if (!response.data.status)
          return this.showAlert(response.data.message, false);
        this.$router.push({ path: "/admin/price" });
      });
    },
    showAlert: function(message, type = true) {
      this.$swal.fire({
        icon: `${type ? "success" : "error"}`,
        title: message,
        showConfirmButton: false,
        timer: 15e2
      });
    }
  }
};
</script>

<style>
</style>