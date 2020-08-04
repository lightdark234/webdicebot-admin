<template>
  <div>
    <Nav />

    <div class="container pt-4">
      <router-link to="/ref/add">
        <button type="button" class="btn btn-primary mb-2">Add</button>
      </router-link>

      <div class="table-responsive-sm">
        <table class="table table-bordered table-sm bg-white">
          <thead>
            <th>Title</th>
            <th>Url</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="ref in refs" :key="ref._id">
              <td>{{ ref.title.slice(0, 32) }}</td>
              <td>{{ ref.url }}</td>
              <td>
                <button type="button" class="btn btn-danger btn-sm" @click="confirm(ref._id)">Delete</button>
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
      refs: [],
      perPage: 10,
      currentPage: 1,
      totalPage: 0,
    };
  },
  mounted: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function (page) {
      axios({
        url:
          API_URL +
          `/ref?limit=${this.perPage}&page=${page ? page : this.currentPage}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.refs = response.data.docs;
          this.totalPage = response.data.totalPages;
        })
        .catch(() => this.$router.push({ path: "/login" }));
    },
    confirm: function (id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) return this.delete(id);
        });
    },
    delete: function (id) {
      axios({
        url: API_URL + "/ref/delete/" + id,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.fetchData();
      });
    },
  },
};
</script>

<style>
</style>