<template>
  <div>
    <Nav />

    <div class="container pt-4">
      <router-link to="/price">
        <button type="button" class="btn btn-secondary mb-2">Cancel</button>
      </router-link>

      <hr class="mt-2 mb-2" />

      <div v-if="isLoading" class="spinner-border"></div>

      <div v-else>
        <label>Limit</label>
        <div class="form-group">
          <input type="text" class="form-control" v-model="limit" />
        </div>

        <label>Amount</label>
        <div class="form-group">
          <input type="text" class="form-control" v-model="amount" />
        </div>

        <button type="button" class="btn btn-primary w-100" @click="add()">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  components: {
    Nav,
  },
  data() {
    return {
      isLoading: false,
      limit: 0,
      amount: 0,
    };
  },
  methods: {
    add: function () {
      this.isLoading = !this.isLoading;
      axios({
        url: API_URL + "/price",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          limit: this.limit,
          amount: this.amount,
        },
      }).then((response) => {
        this.isLoading = !this.isLoading;
        if (!response.data.status)
          return this.showAlert(response.data.message, false);
        this.$router.push({ path: "/price" });
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