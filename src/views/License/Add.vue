<template>
  <div>
    <Nav />

    <b-container>
      <router-link to="/admin/license">
        <b-button class="mb-2">Cancel</b-button>
      </router-link>

      <b-overlay :show="loading" rounded="sm">
        <label>Email</label>
        <b-form-input v-model="email" class="mb-2"></b-form-input>

        <label>Limit</label>
        <b-form-select v-model="limit" :options="prices" class="mb-2"></b-form-select>

        <label>Type</label>
        <b-form-select v-model="type" :options="types" class="mb-2"></b-form-select>

        <label>Hash</label>
        <b-form-input v-model="hash" class="mb-2"></b-form-input>

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
      prices: [],
      types: [
        { value: "free", text: "Free" },
        { value: "pay", text: "Pay" }
      ],
      email: "",
      limit: 10,
      type: "free",
      hash: ""
    };
  },
  mounted: function() {
    this.fetchPrice();
  },
  methods: {
    fetchPrice: function() {
      this.loading = !this.loading;
      axios({
        url: API_URL + "/price",
        method: "GET"
      }).then(response => {
        this.loading = !this.loading;
        this.prices = response.data.map(res => {
          return {
            value: res.limit,
            text: res.limit
          };
        });
      });
    },
    add: function() {
      this.loading = !this.loading;
      axios({
        url: API_URL + "/license",
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          email: this.email,
          limit: this.limit,
          type: this.type,
          hash: this.hash
        }
      }).then(response => {
        this.loading = !this.loading;
        if (!response.data.status)
          return this.showAlert(response.data.message, false);
        this.$router.push({ path: "/admin/license" });
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