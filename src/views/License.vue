<template>
  <div>
    <Nav />

    <b-overlay :show="loading" rounded="sm">
      <b-container>
        <router-link to="/admin/license/add">
          <b-button variant="primary" class="mb-2">Add</b-button>
        </router-link>

        <b-row>
          <b-col sm="12" md="12">
            <b-form-input
              v-model="keyword"
              class="mb-2"
              @change="searchLicenses()"
              placeholder="Search by email"
            ></b-form-input>
          </b-col>
        </b-row>

        <div class="table-responsive-sm">
          <table class="table table-bordered table-sm bg-white">
            <thead>
              <th>Time</th>
              <th>Email</th>
              <th>Value</th>
              <th>Limit</th>
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
                <td>
                  <b-input-group size="sm" class="mb-2">
                    <b-form-input v-model="license.value" type="password"></b-form-input>
                    <b-input-group-append>
                      <b-button
                        variant="primary"
                        v-clipboard="() => license.value"
                        v-clipboard:success="clipboardSuccess"
                        v-clipboard:error="clipboardError"
                      >Copy</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </td>
                <td>{{ license.price.limit }}</td>
                <td>
                  <b-button
                    v-if="(Date.now() - new Date(license.time)) / 864e5 < license.price.limit"
                    variant="warning"
                    size="sm"
                    class="mb-2"
                    @click="confirm(license._id, `${license.locked ? 'unlock' : 'lock'}`)"
                  >{{ license.locked ? 'Unlock' : 'Lock' }}</b-button>
                  <b-button
                    variant="danger"
                    size="sm"
                    class="mb-2"
                    @click="confirm(license._id, 'delete')"
                  >Delete</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-container>
    </b-overlay>
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
      keyword: "",
      loading: false,
      licenses: [],
      perPage: 20,
      currentPage: 1,
    };
  },
  mounted: function () {
    this.fetchLicenses();
  },
  methods: {
    fetchLicenses: function (page) {
      this.loading = !this.loading;
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
          this.loading = !this.loading;
          // console.log(response.data);
          this.licenses = response.data.docs;
          this.totalRows = response.data.length;
        })
        .catch(() => this.$router.push({ path: "/login" }));
    },
    searchLicenses: function (page) {
      if (this.keyword == "") return this.fetchLicenses();

      this.loading = !this.loading;
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
          this.loading = !this.loading;
          // console.log(response.data);
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
          // console.log(result);
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
          // console.log(response);
          this.fetchLicenses();
        });

      axios({
        url: API_URL + "/license/" + action + "/" + id,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        // console.log(response);
        this.fetchLicenses();
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