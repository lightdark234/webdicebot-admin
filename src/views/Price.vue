<template>
  <div>
    <Nav />

    <b-overlay :show="loading" rounded="sm">
      <b-container>
        <router-link to="/admin/price/add">
          <b-button variant="primary" class="mb-2">Add</b-button>
        </router-link>

        <b-row>
          <b-col sm="12" md="4">
            <b-form-select v-model="perPage" :options="selectPer" class="mb-2"></b-form-select>
          </b-col>
        </b-row>

        <div class="table-responsive-sm">
          <table class="table table-bordered table-sm bg-white">
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
                  <b-button
                    variant="danger"
                    size="sm"
                    class="mb-2"
                    @click="confirm(price._id)"
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
    Nav
  },
  data() {
    return {
      loading: false,
      prices: [],
      perPage: 20,
      selectPer: [
        {
          value: 20,
          text: 20
        },
        {
          value: 50,
          text: 50
        },
        {
          value: 200,
          text: 200
        },
        {
          value: 500,
          text: 500
        }
      ],
      currentPage: 1
    };
  },
  mounted: function() {
    this.fetchPrices();
  },
  computed: {
    rows() {
      return this.prices.length;
    }
  },
  methods: {
    fetchPrices: function(page) {
      this.loading = !this.loading;
      axios({
        url:
          API_URL +
          `/price?limit=${this.perPage}&page=${page ? page : this.currentPage}`,
        method: "GET"
      })
        .then(response => {
          this.loading = !this.loading;
          // console.log(response.data);
          this.prices = response.data.docs;
          this.totalRows = response.data.length;
        })
        .catch(() => this.$router.push({ path: "/login" }));
    },
    confirm: function(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          showCancelButton: true
        })
        .then(result => {
          // console.log(result);
          if (result.value) return this.delete(id);
        });
    },
    delete: function(id) {
      axios({
        url: API_URL + "/price/" + id,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(response => {
        // console.log(response);
        this.fetchPrices();
      });
    }
  }
};
</script>

<style>
</style>