<template>
  <div>
    <Nav />

    <div class="container pt-4">
      <router-link to="/license/add">
        <button type="button" class="btn btn-primary mb-2">Add</button>
      </router-link>

      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="keyword"
          @change="search()"
          placeholder="Search by email"
        />
      </div>

      <div class="table-responsive-sm">
        <div v-if="isLoading" class="spinner-border"></div>

        <table v-else class="table table-bordered table-sm bg-white">
          <thead>
            <th>Time</th>
            <th>Email</th>
            <th>Limit</th>
            <th>Value</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="license in licenses" :key="license._id">
              <td>{{ new Date(license.time).toLocaleDateString('vi-VN') }}</td>
              <td>
                <span
                  v-if="license.locked ||  (Date.now() - new Date(license.time)) / 864e5 > license.price.limit"
                >
                  <strike
                    v-bind:class="{ 'text-primary':  license.type == 'pay'}"
                  >{{ license.email }}</strike>
                </span>
                <span
                  v-else
                  v-bind:class="{ 'text-primary':  license.type == 'pay'}"
                >{{ license.email }}</span>
              </td>
              <td>{{ license.price.limit }}</td>
              <td>
                <div class="input-group mb-2 input-group-sm">
                  <input type="password" class="form-control" v-model="license.value" />
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-primary"
                      v-clipboard="() => license.value"
                      v-clipboard:success="clipboardSuccess"
                      v-clipboard:error="clipboardError"
                    >Copy</button>
                  </div>
                </div>
              </td>
              <td>
                <button
                  v-if="(Date.now() - new Date(license.time)) / 864e5 < license.price.limit"
                  type="button"
                  class="btn btn-warning btn-sm mb-2"
                  @click="confirm(license._id, `${license.locked ? 'unlock' : 'lock'}`)"
                >{{ license.locked ? 'Unlock' : 'Lock' }}</button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm mb-2"
                  @click="confirm(license._id, 'delete')"
                >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
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
      keyword: "",
      licenses: [],
      perPage: 10,
      currentPage: 1,
    };
  },
  mounted: function () {
    this.fetch();
  },
  methods: {
    fetch: function (page) {
      this.isLoading = !this.isLoading;
      axios({
        url:
          API_URL +
          `/license?limit=${this.perPage}&page=${
            page ? page : this.currentPage
          }`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.isLoading = !this.isLoading;
          this.licenses = response.data.docs;
          this.totalRows = response.data.length;
        })
        .catch(() => this.$router.push({ path: "/login" }));
    },
    search: function (page) {
      if (this.keyword == "") return this.fetch();
      this.isLoading = !this.isLoading;
      axios({
        url:
          API_URL +
          `/license/search/${this.keyword}?limit=${this.perPage}&page=${
            page ? page : this.currentPage
          }`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.isLoading = !this.isLoading;
          this.licenses = response.data.docs;
          this.totalRows = response.data.length;
        })
        .catch(() => this.$router.push({ path: "/login" }));
    },
    confirm: function (id, action) {
      this.$swal
        .fire({
          title: "Are you sure?",
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) return this.action(id, action);
        });
    },
    action: function (id, action) {
      if (action == "delete")
        return axios({
          url: API_URL + "/license/" + id,
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }).then((response) => {
          this.fetch();
        });

      axios({
        url: API_URL + "/license/" + action + "/" + id,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.fetch();
      });
    },
    clipboardSuccess: function ({ value, event }) {
      if (value == null) return this.showAlert("Empty value", false);
      this.showAlert("Copy success");
    },
    clipboardError: function ({ value, event }) {
      this.showAlert("Copy fail", false);
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