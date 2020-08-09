<template>
  <div>
    <Nav />

    <div class="container pt-4">
      <router-link to="/ref">
        <button type="button" class="btn btn-secondary mb-2">Cancel</button>
      </router-link>

      <hr class="mt-2 mb-2" />

      <div v-if="isLoading" class="spinner-border"></div>

      <div v-else>
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" v-model="title" />
        </div>

        <div class="form-group">
          <label>Url</label>
          <input type="text" class="form-control" v-model="url" />
        </div>

        <div class="form-group">
          <label>Type</label>
          <select v-model="type" class="form-control" id="sel1">
            <option v-for="type in selectType" :key="type" :value="type">{{ type }}</option>
          </select>
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
      title: "",
      url: "",
      type: "Admin",
      selectType: ["Admin", "User"],
    };
  },
  methods: {
    add: function () {
      this.isLoading = !this.isLoading;
      axios({
        url: API_URL + "/ref/add",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          title: this.title,
          url: this.url,
          type: this.type
        },
      }).then((response) => {
        this.isLoading = !this.isLoading;
        if (!response.data.status)
          return this.showAlert(response.data.message, false);
        this.$router.push({ path: "/ref" });
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