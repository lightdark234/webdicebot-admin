<template>
  <div>
    <Nav />

    <b-container>
      <b-row>
        <b-col sm="12" md="5">
          <datetime
            class="form-control mb-2"
            type="datetime"
            v-model="from"
            format="yyyy-MM-dd HH:mm"
          ></datetime>
          <!-- <b-form-datepicker id="from-datepicker" v-model="from" class="mb-2"></b-form-datepicker> -->
        </b-col>
        <b-col sm="12" md="5">
          <datetime
            class="form-control mb-2"
            type="datetime"
            v-model="to"
            format="yyyy-MM-dd HH:mm"
          ></datetime>
          <!-- <b-form-datepicker id="to-datepicker" v-model="to" class="mb-2"></b-form-datepicker> -->
        </b-col>
        <b-col sm="12" md="2">
          <b-button variant="primary" block class="mb-2" @click="filter()">Update</b-button>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12" md="3">
          <b-overlay :show="loading" rounded="sm">
            <b-card class="mb-2 bg-white text-center">
              Income DOGE
              <h4 class="text-warning">{{ doge.toLocaleString() }}</h4>
            </b-card>
          </b-overlay>
        </b-col>

        <b-col sm="12" md="3">
          <b-overlay :show="loading" rounded="sm">
            <b-card class="mb-2 bg-white text-center">
              License
              <h4 class="text-primary">{{ license }}</h4>
            </b-card>
          </b-overlay>
        </b-col>

        <b-col sm="12" md="3">
          <b-overlay :show="loading" rounded="sm">
            <b-card class="mb-2 bg-white text-center">
              Pay
              <h4 class="text-success">{{ pay }}</h4>
            </b-card>
          </b-overlay>
        </b-col>

        <b-col sm="12" md="3">
          <b-overlay :show="loading" rounded="sm">
            <b-card class="mb-2 bg-white text-center">
              Free
              <h4 class="text-danger">{{ free }}</h4>
            </b-card>
          </b-overlay>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import axios from "axios";
import API_URL from "@/utils/apiUrl";
import { Datetime } from "vue-datetime";

export default {
  components: {
    Nav,
    datetime: Datetime,
  },
  data() {
    return {
      loading: false,
      licenses: [],
      license: 0,
      free: 0,
      pay: 0,
      doge: 0,
      from: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toISOString(),
      to: new Date().toISOString(),
    };
  },
  mounted: function () {
    this.fetchLicense();
  },
  methods: {
    fetchLicense: function () {
      this.loading = !this.loading;
      axios({
        url: API_URL + "/license",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.loading = !this.loading;
          // console.log(response);
          this.licenses = response.data;
          this.filter();
        })
        .catch(() => this.$router.push({ path: "/login" }));
    },
    filter: function () {
      this.license = 0;
      this.doge = 0;
      this.free = 0;
      this.pay = 0;
      this.licenses.map((license) => {
        if (
          new Date(license.time) >= new Date(this.from) &&
          new Date(license.time) <= new Date(this.to)
        ) {
          this.license += 1;
          if (license.type == "free") {
            this.free++;
          } else {
            this.pay++;
            this.doge += license.price.amount.pay;
          }
        }
      });
    },
  },
};
</script>

<style>
</style>