<template>
  <div>
    <Nav />

    <div class="container pt-4">
      <router-link to="/license">
        <button type="button" class="btn btn-secondary mb-2">Cancel</button>
      </router-link>

      <hr class="mt-2 mb-2" />

      <div v-if="isLoading" class="spinner-border"></div>

      <div v-else>
        <label>Email</label>
        <div class="form-group">
          <input type="text" class="form-control" v-model="email" />
        </div>

        <label>Limit</label>

        <select class="form-control" v-model="limit">
          <option v-for="price in prices" :key="price.value" :value="price.value">{{ price.text }}</option>
        </select>

        <label>Type</label>
        <select class="form-control" v-model="type">
          <option v-for="type in types" :key="type.value" :value="type.value">{{ type.text }}</option>
        </select>

        <label>Hash</label>
        <div class="form-group">
          <input type="text" class="form-control" v-model="hash" />
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
      prices: [],
      types: [
        { value: "free", text: "Free" },
        { value: "pay", text: "Pay" },
      ],
      email: "",
      limit: 10,
      type: "free",
      hash: "",
    };
  },
  mounted: function () {
    this.fetchPrice();
  },
  methods: {
    fetchPrice: function () {
      this.isLoading = !this.isLoading;
      axios({
        url: API_URL + "/price",
        method: "GET",
      }).then((response) => {
        this.isLoading = !this.isLoading;
        this.prices = response.data.map((res) => {
          return {
            value: res.limit,
            text: res.limit,
          };
        });
      });
    },
    add: function () {
      this.isLoading = !this.isLoading;
      axios({
        url: API_URL + "/license",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          email: this.email,
          limit: this.limit,
          type: this.type,
          hash: this.hash,
        },
      }).then((response) => {
        this.isLoading = !this.isLoading;
        if (!response.data.status)
          return this.showAlert(response.data.message, false);
        this.$router.push({ path: "/license" });
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