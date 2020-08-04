<template>
  <div>
    <Nav />

    <div class="container pt-4">
      <router-link to="/price/add">
        <button type="button" class="btn btn-primary mb-2">Add</button>
      </router-link>

      <div class="table-responsive-sm">
        <div v-if="isLoading" class="spinner-border"></div>

        <table v-else class="table table-bordered table-sm bg-white">
          <thead>
            <th>Limit</th>
            <th>Amount</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="price in prices" :key="price._id">
              <td>{{ price.limit }} Days</td>
              <td>{{ price.amount.pay.toLocaleString() }} Doge</td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="confirm(price._id)"
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
      prices: [],
      perPage: 20,
      selectPer: [
        {
          value: 20,
          text: 20,
        },
        {
          value: 50,
          text: 50,
        },
        {
          value: 200,
          text: 200,
        },
        {
          value: 500,
          text: 500,
        },
      ],
      currentPage: 1,
    };
  },
  mounted: function () {
    this.fetchPrices();
  },
  computed: {
    rows() {
      return this.prices.length;
    },
  },
  methods: {
    fetchPrices: function (page) {
      this.isLoading = !this.isLoading;
      axios({
        url:
          API_URL +
          `/price?limit=${this.perPage}&page=${page ? page : this.currentPage}`,
        method: "GET",
      })
        .then((response) => {
          this.isLoading = !this.isLoading;
          // console.log(response.data);
          this.prices = response.data.docs;
          this.totalRows = response.data.length;
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
          // console.log(result);
          if (result.value) return this.delete(id);
        });
    },
    delete: function (id) {
      axios({
        url: API_URL + "/price/" + id,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        // console.log(response);
        this.fetchPrices();
      });
    },
  },
};
</script>

<style>
</style>